<script setup lang="ts">
import { onMounted, ref, provide, watch, defineOptions } from "vue";
import vResize from "@/directive/vResize";
import { DashboardClass, Props, PROPS_DEFAULTS } from "./dashboard.utils";

type Emits = {
  currentBreakpointUpdated: [breakpoint?: string];
};

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), PROPS_DEFAULTS);
const emit = defineEmits<Emits>();

const dashboard = ref<DashboardClass>();
provide("$dashboard", () => dashboard.value);

function onResize(element: { detail: { width: number; height: number } }) {
  if (!dashboard.value) {
    return;
  }

  dashboard.value.width = element.detail.width;
}

watch(
  () => props.autoHeight,
  (newValue) => {
    if (!dashboard.value) {
      return;
    }

    dashboard.value.autoHeight = newValue;
  }
);

watch(
  () => dashboard.value?.currentBreakpoint,
  (newValue) => {
    emit("currentBreakpointUpdated", newValue);
  }
);

onMounted(() => {
  dashboard.value = new DashboardClass(props);
});
</script>

<template>
  <div v-if="dashboard" v-resize :id="id" @resize="onResize">
    <slot />
  </div>
</template>
