<script setup lang="ts">
import Dashboard from "@/components/Dashboard.vue";
import DashLayout from "@/components/DashLayout.vue";
import DashItem from "@/components/DashItem.vue";
import useDashboard from "@/use/useDashboard";
import { ref } from "vue";

const draggable = ref(false);

const { layouts } = useDashboard([
  {
    breakpoint: "cols10",
    numberOfCols: 10,
    breakpointWidth: 1919,
    items: [
      {
        id: "1",
        parameters: { x: 0, y: 0, width: 2, height: 2 },
        settings: { resizable: true },
      },
      { id: "2", parameters: { x: 2, y: 0, width: 2, height: 1 } },
      { id: "3", parameters: { x: 4, y: 0, width: 1, height: 1 } },
      { id: "4", parameters: { x: 5, y: 0, width: 1, height: 1 } },
      { id: "5", parameters: { x: 6, y: 0, width: 1, height: 1 } },
      { id: "6", parameters: { x: 7, y: 0, width: 1, height: 1 } },
      { id: "7", parameters: { x: 8, y: 0, width: 1, height: 1 } },
      { id: "8", parameters: { x: 9, y: 0, width: 1, height: 1 } },
    ],
  },
  {
    breakpoint: "cols9",
    numberOfCols: 9,
    breakpointWidth: 1729,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
      { id: "2", parameters: { x: 2, y: 0, width: 2, height: 1 } },
      { id: "3", parameters: { x: 4, y: 0, width: 1, height: 1 } },
      { id: "4", parameters: { x: 5, y: 0, width: 1, height: 1 } },
      { id: "5", parameters: { x: 6, y: 0, width: 1, height: 1 } },
      { id: "6", parameters: { x: 7, y: 0, width: 1, height: 1 } },
      { id: "7", parameters: { x: 8, y: 0, width: 1, height: 1 } },
      { id: "8", parameters: { x: 2, y: 1, width: 1, height: 1 } },
    ],
  },
  {
    breakpoint: "cols8",
    numberOfCols: 8,
    breakpointWidth: 1539,
    items: [
      {
        id: "1",
        parameters: { x: 0, y: 0, width: 2, height: 2 },
        settings: { minWidth: 2, maxHeight: 4, maxWidth: 5 },
      },
      { id: "2", parameters: { x: 2, y: 0, width: 2, height: 1 } },
      { id: "3", parameters: { x: 4, y: 0, width: 1, height: 1 } },
      { id: "4", parameters: { x: 5, y: 0, width: 1, height: 1 } },
      { id: "5", parameters: { x: 6, y: 0, width: 1, height: 1 } },
      { id: "6", parameters: { x: 7, y: 0, width: 1, height: 1 } },
      { id: "7", parameters: { x: 2, y: 1, width: 1, height: 1 } },
      { id: "8", parameters: { x: 3, y: 1, width: 1, height: 1 } },
    ],
  },
  {
    breakpoint: "cols7",
    numberOfCols: 7,
    breakpointWidth: 1349,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
      { id: "2", parameters: { x: 2, y: 0, width: 2, height: 1 } },
      { id: "3", parameters: { x: 4, y: 0, width: 1, height: 1 } },
      { id: "4", parameters: { x: 5, y: 0, width: 1, height: 1 } },
      { id: "5", parameters: { x: 6, y: 0, width: 1, height: 1 } },
      { id: "6", parameters: { x: 2, y: 1, width: 1, height: 1 } },
      { id: "7", parameters: { x: 3, y: 1, width: 1, height: 1 } },
      { id: "8", parameters: { x: 4, y: 1, width: 1, height: 1 } },
    ],
  },
  {
    breakpoint: "cols6",
    numberOfCols: 6,
    breakpointWidth: 1159,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
      { id: "2", parameters: { x: 2, y: 0, width: 2, height: 1 } },
      { id: "3", parameters: { x: 4, y: 0, width: 1, height: 1 } },
      { id: "4", parameters: { x: 5, y: 0, width: 1, height: 1 } },
      { id: "5", parameters: { x: 2, y: 1, width: 1, height: 1 } },
      { id: "6", parameters: { x: 3, y: 1, width: 1, height: 1 } },
      { id: "7", parameters: { x: 4, y: 1, width: 1, height: 1 } },
      { id: "8", parameters: { x: 5, y: 1, width: 1, height: 1 } },
    ],
  },
  {
    breakpoint: "cols5",
    numberOfCols: 5,
    breakpointWidth: 969,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
      { id: "2", parameters: { x: 2, y: 0, width: 2, height: 1 } },
      { id: "3", parameters: { x: 4, y: 0, width: 1, height: 1 } },
      { id: "4", parameters: { x: 2, y: 1, width: 1, height: 1 } },
      { id: "5", parameters: { x: 3, y: 1, width: 1, height: 1 } },
      { id: "6", parameters: { x: 4, y: 1, width: 1, height: 1 } },
      { id: "7", parameters: { x: 0, y: 2, width: 1, height: 1 } },
      { id: "8", parameters: { x: 1, y: 2, width: 1, height: 1 } },
    ],
  },
  {
    breakpoint: "cols4",
    numberOfCols: 4,
    breakpointWidth: 779,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
      { id: "2", parameters: { x: 2, y: 0, width: 2, height: 1 } },
      { id: "3", parameters: { x: 2, y: 1, width: 1, height: 1 } },
      { id: "4", parameters: { x: 3, y: 1, width: 1, height: 1 } },
      { id: "5", parameters: { x: 0, y: 2, width: 1, height: 1 } },
      { id: "6", parameters: { x: 1, y: 2, width: 1, height: 1 } },
      { id: "7", parameters: { x: 2, y: 2, width: 1, height: 1 } },
      { id: "8", parameters: { x: 3, y: 2, width: 1, height: 1 } },
    ],
  },
  {
    breakpoint: "cols3",
    numberOfCols: 3,
    breakpointWidth: 589,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
      { id: "2", parameters: { x: 0, y: 2, width: 2, height: 1 } },
      { id: "3", parameters: { x: 2, y: 0, width: 1, height: 1 } },
      { id: "4", parameters: { x: 2, y: 1, width: 1, height: 1 } },
      { id: "5", parameters: { x: 2, y: 2, width: 1, height: 1 } },
      { id: "6", parameters: { x: 0, y: 3, width: 1, height: 1 } },
      { id: "7", parameters: { x: 1, y: 3, width: 1, height: 1 } },
      { id: "8", parameters: { x: 2, y: 3, width: 1, height: 1 } },
    ],
  },
  {
    breakpoint: "cols2",
    numberOfCols: 2,
    breakpointWidth: 399,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
      { id: "2", parameters: { x: 0, y: 2, width: 2, height: 1 } },
      { id: "3", parameters: { x: 0, y: 3, width: 1, height: 1 } },
      { id: "4", parameters: { x: 1, y: 3, width: 1, height: 1 } },
      { id: "5", parameters: { x: 0, y: 4, width: 1, height: 1 } },
      { id: "6", parameters: { x: 1, y: 4, width: 1, height: 1 } },
      { id: "7", parameters: { x: 0, y: 5, width: 1, height: 1 } },
      { id: "8", parameters: { x: 1, y: 5, width: 1, height: 1 } },
    ],
  },
]);
</script>

<template>
  <div id="app">
    <button @click="draggable = !draggable">Set Draggable</button>
    <button
      @click="
        () => {
          console.log(layouts);
        }
      "
    >
      Print Layouts
    </button>
    <dashboard id="dashExample">
      <dash-layout
        v-for="layout in layouts"
        v-bind="layout"
        :key="layout.breakpoint"
        :margin="{ x: 20, y: 20 }"
      >
        <dash-item
          v-for="item in layout.items"
          v-model="item.parameters"
          :draggable="draggable"
          :resizable="false"
          :id="item.id"
          :key="item.id"
          v-bind="item?.settings"
        >
          <div class="content">
            {{ item.id }}
          </div>
        </dash-item>
      </dash-layout>
    </dashboard>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  height: 100%;
  width: 100%;
  border: 2px solid #42b983;
  border-radius: 5px;
  background-color: #42b9833d;
}
</style>
