<script setup lang="ts">
import "@interactjs/actions";
import "@interactjs/auto-start";
import interact from "@interactjs/interact";

import {
  cssTopLeft,
  cssTransform,
  ItemClass,
  Props,
  PROPS_DEFAULTS,
} from "./item.utils";
import {
  watch,
  defineOptions,
  inject,
  computed,
  ref,
  WatchStopHandle,
  onMounted,
  onUnmounted,
  Ref,
} from "vue";
import { LayoutClass } from "./layout.utils";
import { Item, LayoutItem } from "@/components/types";
import { InteractEvent, ResizeEvent } from "@interactjs/types";

type Emits = {
  "update:modelValue": [item: LayoutItem["parameters"]];
  moveStart: [item: Item];
  moving: [item: Item];
  moveEnd: [item: Item];
  resizeStart: [item: Item];
  resizing: [item: Item];
  resizeEnd: [item: Item];
  hoverStart: [item: ItemClass];
  hoverEnd: [item: ItemClass];
};

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), PROPS_DEFAULTS);
const emit = defineEmits<Emits>();

const item = ref<ItemClass>();

const layout = inject("$layout") as Ref<LayoutClass>;

const itemElement = ref<HTMLDivElement>();

const interactInstance = ref<ReturnType<typeof interact>>();
const dragging = ref(false);
const resizing = ref(false);
const unWatch = ref<WatchStopHandle>();
const hover = ref(false);

const resizingOrDragging = computed(
  () => (resizing.value || dragging.value) && !props.locked
);

const useCssTransforms = computed(() => layout.value?.useCssTransforms ?? null);

const classObj = computed(() => ({
  dragging: resizingOrDragging.value,
  cssTransforms: useCssTransforms.value,
}));

const left = computed(() => item.value?.left ?? 0);
const top = computed(() => item.value?.top ?? 0);

const widthPx = computed(() => item.value?.widthPx ?? 0);
const heightPx = computed(() => item.value?.heightPx ?? 0);

const cssStyle = computed(() => {
  if (useCssTransforms.value) {
    return cssTransform(top.value, left.value, widthPx.value, heightPx.value);
  }
  return cssTopLeft(top.value, left.value, widthPx.value, heightPx.value);
});

const resizeTop = computed(
  () => !props.locked && props.resizable && props.resizeEdges.includes("top")
);
const resizeBottom = computed(
  () => !props.locked && props.resizable && props.resizeEdges.includes("bottom")
);
const resizeLeft = computed(
  () => !props.locked && props.resizable && props.resizeEdges.includes("left")
);
const resizeRight = computed(
  () => !props.locked && props.resizable && props.resizeEdges.includes("right")
);

const resizeTopLeft = computed(() => resizeTop.value && resizeLeft.value);
const resizeBottomLeft = computed(() => resizeBottom.value && resizeLeft.value);
const resizeTopRight = computed(() => resizeTop.value && resizeRight.value);
const resizeBottomRight = computed(
  () => resizeBottom.value && resizeRight.value
);

function onMoveStart() {
  dragging.value = true;
  item.value?._onMoveStart();
  emit("moveStart", { ...item.value?.toItem() } as Item);
}

function onMove(event: InteractEvent) {
  if (!dragging.value) {
    return;
  }

  item.value?._onMove(event.dx, event.dy);
  emit("moving", { ...item.value?.toItem() } as Item);
}

function onMoveEnd() {
  dragging.value = false;
  item.value?._onMoveEnd();
  emit("moveEnd", { ...item.value?.toItem() } as Item);
}

function onResizeStart() {
  resizing.value = true;
  item.value?._onResizeStart();
  emit("resizeStart", { ...item.value?.toItem() } as Item);
}

function onResize(event: ResizeEvent) {
  if (!resizing.value) {
    return;
  }

  item.value?._onResize(event);
  emit("resizing", { ...item.value?.toItem() } as Item);
}

function onResizeEnd() {
  resizing.value = false;
  item.value?._onResizeEnd();
  emit("resizeEnd", { ...item.value?.toItem() } as Item);
}

function setDraggable() {
  if (!props.draggable || props.locked) {
    interactInstance.value?.draggable(false);
    return;
  }

  interactInstance.value?.draggable({
    enabled: true,
    hold: props.moveHold,
    allowFrom: props.dragAllowFrom ?? undefined,
    ignoreFrom: props.dragIgnoreFrom ?? undefined,
    listeners: {
      start: () => {
        onMoveStart();
      },
      move: (event: InteractEvent) => {
        onMove(event);
      },
      end: () => {
        onMoveEnd();
      },
    },
  });
}

function setResizable() {
  if (!props.resizable || props.locked) {
    interactInstance.value?.resizable(false);
    return;
  }

  interactInstance.value?.resizable({
    enabled: true,
    hold: props.resizeHold,
    edges: {
      top: ".resize-top",
      left: ".resize-left",
      bottom: ".resize-bottom",
      right: ".resize-right",
    },
    listeners: {
      start: () => {
        onResizeStart();
      },
      move: (event: ResizeEvent) => {
        onResize(event);
      },
      end: () => {
        onResizeEnd();
      },
    },
  });
}

function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

function createPropWatchers() {
  (Object.keys(props) as (keyof Props)[]).forEach((key) => {
    watch(
      () => props[key],
      () => {
        if (!item.value) {
          return;
        }

        if (key === "modelValue") {
          item.value.x = props.modelValue.x;
          item.value.y = props.modelValue.y;
          item.value.width = props.modelValue.width;
          item.value.height = props.modelValue.height;
          return;
        }

        if (!isKey(item.value, key)) {
          return;
        }

        if (item.value[key] === props[key]) {
          return;
        }

        // TODO: Fix types, now I'am lazy
        // eslint-disable-next-line
        // @ts-ignore
        item.value[key] = props[key];
      }
    );
  });
}

watch(hover, (newValue) => {
  if (!item.value) {
    return;
  }

  item.value.hover = newValue;

  if (newValue) {
    emit("hoverStart", item.value);
    return;
  }
  emit("hoverEnd", item.value);
});

watch(
  [
    () => props.draggable,
    () => props.moveHold,
    () => props.dragAllowFrom,
    () => props.dragIgnoreFrom,
  ],
  () => {
    setDraggable();
  }
);

watch([() => props.resizable, () => props.resizeHold], () => {
  setResizable();
});

watch(
  () => props.locked,
  () => {
    setDraggable();
    setResizable();
  }
);

watch(
  [
    () => item.value?.x,
    () => item.value?.y,
    () => item.value?.width,
    () => item.value?.height,
  ],
  () => {
    emit("update:modelValue", {
      x: item.value?.x as number,
      y: item.value?.y as number,
      width: item.value?.width as number,
      height: item.value?.height as number,
    });
  }
);

onMounted(() => {
  const itemSettings = {
    ...props,
    x: props.modelValue.x,
    y: props.modelValue.y,
    width: props.modelValue.width,
    height: props.modelValue.height,
  };

  item.value = new ItemClass(itemSettings);

  interactInstance.value = interact(itemElement.value as HTMLDivElement);
  setDraggable();
  setResizable();

  if (layout.value) {
    layout.value.addDashItem(item.value);
    createPropWatchers();
    return;
  }

  unWatch.value = watch(
    layout,
    (newValue) => {
      if (!newValue || !item.value) {
        return;
      }

      layout.value?.addDashItem(item.value);
      createPropWatchers();

      if (!unWatch.value) {
        return;
      }

      unWatch.value();
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  interactInstance.value?.unset();

  if (!item.value) {
    return;
  }

  layout.value?.removeDashItem(item.value);
});
</script>

<template>
  <div
    :id="'item_' + id"
    :style="cssStyle"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    ref="itemElement"
    class="item"
    :class="classObj"
  >
    <!-- Resize Top Div -->
    <div
      v-if="resizeTop"
      :id="id + '-resizeTop'"
      :ref="id + '-resizeTop'"
      :style="{
        height: resizeHandleSize + 'px',
        top: -(resizeHandleSize / 2) + 'px',
        left: 0,
        right: 0,
        cursor: 'ns-resize',
        position: 'absolute',
        zIndex: resizableZIndex,
      }"
      class="resize resize-top"
    >
      <slot name="resizeTop"></slot>
    </div>
    <!-- Resize Bottom Div -->
    <div
      v-if="resizeBottom"
      :id="id + '-resizeBottom'"
      :ref="id + '-resizeBottom'"
      :style="{
        height: resizeHandleSize + 'px',
        left: 0 + 'px',
        right: 0 + 'px',
        bottom: -(resizeHandleSize / 2) + 'px',
        cursor: 'ns-resize',
        position: 'absolute',
        zIndex: resizableZIndex,
      }"
      class="resize resize-bottom"
    >
      <slot name="resizeBottom"></slot>
    </div>
    <!-- Resize Left Div -->
    <div
      v-if="resizeLeft"
      :id="id + '-resizeLeft'"
      :ref="id + '-resizeLeft'"
      :style="{
        width: resizeHandleSize + 'px',
        top: 0 + 'px',
        bottom: 0 + 'px',
        left: -(resizeHandleSize / 2) + 'px',
        cursor: 'ew-resize',
        position: 'absolute',
        zIndex: resizableZIndex,
      }"
      class="resize resize-left"
    >
      <slot name="resizeLeft"></slot>
    </div>
    <!-- Resize Right Div -->
    <div
      v-if="resizeRight"
      :id="id + '-resizeRight'"
      :ref="id + '-resizeRight'"
      :style="{
        width: resizeHandleSize + 'px',
        top: 0 + 'px',
        bottom: 0 + 'px',
        right: -(resizeHandleSize / 2) + 'px',
        cursor: 'ew-resize',
        position: 'absolute',
        zIndex: resizableZIndex,
      }"
      class="resize resize-right"
    >
      <slot name="resizeRight"></slot>
    </div>
    <!-- Resize Top Left Div -->
    <div
      v-if="resizeTopLeft"
      :id="id + '-resizeTopLeft'"
      :ref="id + '-resizeTopLeft'"
      :style="{
        width: resizeHandleSize * 2 + 'px',
        height: resizeHandleSize * 2 + 'px',
        top: -resizeHandleSize + 'px',
        left: -resizeHandleSize + 'px',
        cursor: 'nw-resize',
        position: 'absolute',
        zIndex: resizableZIndex,
      }"
      class="resize resize-left resize-top"
    >
      <slot name="resizeTopLeft"></slot>
    </div>
    <!-- Top Right Resize Div -->
    <div
      v-if="resizeTopRight"
      :id="id + '-resizeTopRight'"
      :ref="id + '-resizeTopRight'"
      :style="{
        width: resizeHandleSize * 2 + 'px',
        height: resizeHandleSize * 2 + 'px',
        top: -resizeHandleSize + 'px',
        right: -resizeHandleSize + 'px',
        cursor: 'ne-resize',
        position: 'absolute',
        zIndex: resizableZIndex,
      }"
      class="resize resize-right resize-top"
    >
      <slot name="resizeTopRight"></slot>
    </div>
    <!-- Bottom Left Resize Div -->
    <div
      v-if="resizeBottomLeft"
      :id="id + '-resizeBottomLeft'"
      :ref="id + '-resizeBottomLeft'"
      :style="{
        width: resizeHandleSize * 2 + 'px',
        height: resizeHandleSize * 2 + 'px',
        bottom: -resizeHandleSize + 'px',
        left: -resizeHandleSize + 'px',
        cursor: 'ne-resize',
        position: 'absolute',
        zIndex: resizableZIndex,
      }"
      class="resize resize-left resize-bottom"
    >
      <slot name="resizeBottomLeft"></slot>
    </div>
    <!-- Bottom Right Resize Div -->
    <div
      v-if="resizeBottomRight"
      :id="id + '-resizeBottomRight'"
      :ref="id + '-resizeBottomRight'"
      :style="{
        width: resizeHandleSize * 2 + 'px',
        height: resizeHandleSize * 2 + 'px',
        bottom: -resizeHandleSize + 'px',
        right: -resizeHandleSize + 'px',
        cursor: 'nw-resize',
        position: 'absolute',
        zIndex: resizableZIndex,
      }"
      class="resize resize-right resize-bottom"
    >
      <slot name="resizeBottomRight"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.item {
  box-sizing: border-box;
  position: absolute;
  display: inline-block;
  transition: all 200ms ease;
  transition-property: left, top, right;
  touch-action: none;
  user-select: none;
}
.item.dragging {
  transition: none;
  z-index: 3;
}

.resize {
  touch-action: none;
  user-select: none;
}

.item.cssTransforms {
  transition-property: transform;
  left: 0;
  right: auto;
}
</style>
