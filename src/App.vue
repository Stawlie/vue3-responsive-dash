<script setup lang="ts">
import Dashboard from "@/components/Dashboard.vue";
import DashLayout from "@/components/DashLayout.vue";
import DashItem from "@/components/DashItem.vue";
import useDashboard from "@/use/useDashboard";
import { DashboardLayout } from "./components/types";
import { ref } from "vue";

const LAYOUTS: DashboardLayout[] = [
  {
    breakpoint: "cols10",
    numberOfCols: 10,
    breakpointWidth: 1920,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
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
    breakpointWidth: 1730,
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
    breakpointWidth: 1540,
    items: [
      { id: "1", parameters: { x: 0, y: 0, width: 2, height: 2 } },
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
    breakpointWidth: 1350,
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
    breakpointWidth: 1160,
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
    breakpointWidth: 970,
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
    breakpointWidth: 780,
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
    breakpointWidth: 590,
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
    breakpointWidth: 400,
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
];

const draggable = ref(false);

const { layouts, addItem, removeItem } = useDashboard(LAYOUTS);

// Adding item with only width and height to all layouts
// addItem({
//   id: "9",
//   parameters: { width: 2, height: 2 },
// });

// Adding item with only width and height to list of layouts
// addItem(
//   {
//     id: "10",
//     parameters: { width: 2, height: 2 },
//   },
//   ["cols5", "cols6"]
// );

// Adding item with additional settings
// addItem({
//   id: "11",
//   parameters: { width: 2, height: 2 },
//   settings: { draggable: false, resizable: true },
// });

// Adding item with static position
// (use carefully. If it collides, it will move upward until it finds a spot)
// addItem({
//   id: "12",
//   parameters: { width: 2, height: 2, x: 1, y: 2 },
// });

// Remove item from all layouts
// removeItem("4");

// Remove item from list of layouts
// removeItem("5", ["cols5", "cols6"]);
</script>

<template>
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
  <div class="actions">
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
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100svh;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1.25rem 1.25rem 1.25rem;
}

.actions button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.actions :first-child {
  border: 0.125rem solid #4268b9;
  background-color: #4268b93d;
}

.actions :last-child {
  border: 0.125rem solid #b98942;
  background-color: #b989423d;
}

#dashExample {
  height: fit-content;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #dee2e6 transparent;
  flex: 1;
}

@media (pointer: fine) {
  #dashExample::-webkit-scrollbar {
    width: 8px;
  }

  #dashExample::-webkit-scrollbar-thumb {
    background: #dee2e6;
    border-radius: 4px;
  }

  #dashExample::-webkit-scrollbar-thumb:hover {
    background: #babdc0;
  }
  #dashExample::-webkit-scrollbar-thumb:active {
    background: #585858;
  }
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
  border-radius: 0.5rem;
  background-color: #42b9833d;
}

.draggable:nth-of-type(2n + 1) {
  animation: jiggle-first 0.3s infinite alternate;
}
.draggable:nth-of-type(2n) {
  animation: jiggle-second 0.3s infinite alternate;
}

.dragging {
  animation: none !important;
}

@keyframes jiggle-first {
  0% {
    transform: rotate(-0.5deg);
    animation-timing-function: ease-in;
  }

  50% {
    transform: rotate(1deg);
    animation-timing-function: ease-out;
  }
}

@keyframes jiggle-second {
  0% {
    transform: rotate(0.5deg);
    animation-timing-function: ease-in;
  }

  50% {
    transform: rotate(-1deg);
    animation-timing-function: ease-out;
  }
}
</style>
