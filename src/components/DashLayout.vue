<script setup lang="ts">
import { LayoutClass, Props, PROPS_DEFAULTS } from "./layout.utils";
import DashItem from "./DashItem.vue";
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
  WatchStopHandle,
  defineOptions,
  Ref,
} from "vue";
import { DashboardClass } from "./dashboard.utils";
import { PLACEHOLDER_ID } from "./item.utils";
import { Item } from "@/components/types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), PROPS_DEFAULTS);

const layout = ref<LayoutClass>();
provide("$layout", layout);

const dashboard = inject("$dashboard") as Ref<DashboardClass>;

const unWatch = ref<WatchStopHandle>();

const currentBreakpoint = computed(() => dashboard.value?.currentBreakpoint);

const dragging = computed(() => layout.value?.itemBeingDragged);
const resizing = computed(() => layout.value?.itemBeingResized);
const placeholder = computed(() => layout.value?.placeholder?.toItem() ?? "");
const itemsFromLayout = computed(() => layout.value?.items ?? []);
const height = computed(() => `${layout.value?.height}px` ?? "0px");
const width = computed(() => `${layout.value?.width}px` ?? "0px");

function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

function createPropWatchers() {
  (Object.keys(props) as (keyof Props)[]).forEach((key) => {
    watch(
      () => props[key],
      () => {
        if (!layout.value) {
          return;
        }

        if (!isKey(layout.value, key)) {
          return;
        }

        if (layout.value[key] === props[key]) {
          return;
        }

        // TODO: Fix types, now I'am lazy
        // eslint-disable-next-line
        // @ts-ignore
        layout.value[key] = props[key];
      }
    );
  });
}

onMounted(() => {
  const initialItems: Item[] = props.items.map((item) => {
    return {
      id: item.id,
      ...item.parameters,
      ...item?.settings,
    };
  });

  layout.value = new LayoutClass({ ...props, initialItems });

  if (dashboard.value) {
    dashboard.value.addLayoutInstance(layout.value);
    createPropWatchers();
    return;
  }

  unWatch.value = watch(
    () => dashboard.value,
    (newValue) => {
      if (!newValue || !layout.value) {
        return;
      }

      newValue.addLayoutInstance(layout.value);
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
  if (!dashboard.value || !layout.value) {
    return;
  }

  dashboard.value.removeLayoutInstance(layout.value);
});
</script>

<template>
  <div v-if="currentBreakpoint === breakpoint">
    <div
      v-if="layout"
      :style="{
        position: 'relative',
        height,
        width,
      }"
    >
      <slot />
      <dash-item
        v-show="dragging || resizing"
        :id="PLACEHOLDER_ID"
        :dragging="false"
        :resizable="false"
        class="placeholder"
      >
        <slot name="placeholder">
          <div class="placeholder"></div>
        </slot>
      </dash-item>
    </div>
    <div v-if="debug">
      Layout Breakpoint: {{ breakpoint }} <br />
      Layout Number of Cols: {{ numberOfCols }} <br />
      placeholder: {{ placeholder }} <br />
      Items:
      <pre>{{ itemsFromLayout }}</pre>
      <br />
      Height: {{ height }} <br />
      Attrs: {{ $attrs }}
    </div>
  </div>
</template>

<style scoped>
.placeholder {
  height: 100%;
  width: 100%;
  background-color: red;
  opacity: 0.2;
  animation: none !important;
}
</style>
