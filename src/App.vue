<script setup lang="ts">
import Dashboard from "@/components/Dashboard.vue";
import DashLayout from "@/components/DashLayout.vue";
import DashItem from "@/components/DashItem.vue";
import useDashboard from "@/use/useDashboard";
import { ref } from "vue";
import { DashboardLayout } from "./components/types";

const LAYOUTS: DashboardLayout[] = [
  {
    breakpoint: "cols10",
    numberOfCols: 10,
    breakpointWidth: 1920,
    items: [],
  },
  {
    breakpoint: "cols9",
    numberOfCols: 9,
    breakpointWidth: 1730,
    items: [],
  },
  {
    breakpoint: "cols8",
    numberOfCols: 8,
    breakpointWidth: 1540,
    items: [],
  },
  {
    breakpoint: "cols7",
    numberOfCols: 7,
    breakpointWidth: 1350,
    items: [],
  },
  {
    breakpoint: "cols6",
    numberOfCols: 6,
    breakpointWidth: 1160,
    items: [],
  },
  {
    breakpoint: "cols5",
    numberOfCols: 5,
    breakpointWidth: 970,
    items: [],
  },
  {
    breakpoint: "cols4",
    numberOfCols: 4,
    breakpointWidth: 780,
    items: [],
  },
  {
    breakpoint: "cols3",
    numberOfCols: 3,
    breakpointWidth: 590,
    items: [],
  },
  {
    breakpoint: "cols2",
    numberOfCols: 2,
    breakpointWidth: 400,
    items: [],
  },
];

const draggable = ref(false);

const { layouts, addItem } = useDashboard(LAYOUTS);

setTimeout(() => {
  addItem({
    id: "1",
    parameters: { width: 2, height: 2 },
  });
  setTimeout(() => {
    addItem({
      id: "2",
      parameters: { width: 2, height: 1 },
    });
    setTimeout(() => {
      addItem({
        id: "3",
        parameters: { width: 1, height: 1 },
      });
      setTimeout(() => {
        addItem({
          id: "4",
          parameters: { width: 1, height: 1 },
        });
        setTimeout(() => {
          addItem({
            id: "5",
            parameters: { width: 1, height: 1 },
          });
          setTimeout(() => {
            addItem({
              id: "6",
              parameters: { width: 1, height: 1 },
            });
            setTimeout(() => {
              addItem({
                id: "7",
                parameters: { width: 1, height: 1 },
              });
              setTimeout(() => {
                addItem({
                  id: "8",
                  parameters: { width: 1, height: 1 },
                });
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
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
