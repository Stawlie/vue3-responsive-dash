# vue3-responsive-dash

Vue 3 version of [vue-responsive-dash](https://vue-responsive-dash.netlify.com/).

A Responsive, Draggable & Resizable Dashboard (grid) made with vue and typescript.
Inspired by React-Grid-Layout & Vue-Grid-Layout

<!-- <p align="center">
    <img alt="netlify" src="https://img.shields.io/netlify/0d5865ba-90df-4e35-826f-296d6fc6b106">
    <img alt="deps" src ="https://img.shields.io/david/bensladden/vue-responsive-dash">
    <img alt="code-size" src ="https://img.shields.io/github/languages/code-size/bensladden/vue-responsive-dash">
    <img alt="repo-size" src="https://img.shields.io/github/repo-size/bensladden/vue-responsive-dash">
    <img alt="open-issues" src="https://img.shields.io/github/issues-raw/bensladden/vue-responsive-dash">
    <img alt="pull-req" src="https://img.shields.io/github/issues-pr/bensladden/vue-responsive-dash">
    <img alt="lic" src="https://img.shields.io/github/license/bensladden/vue-responsive-dash">
    <img alt="npm" src="https://img.shields.io/npm/v/vue-responsive-dash">
</p>

Example: [![Edit Vue Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-responsive-dash-eggbc?fontsize=14&hidenavigation=1&theme=dark) -->

## 🤟🏻 New Features and changes in 0.1.2

You can use aspectRatio on Layout component!

## 🤟🏻 New Features and changes in 0.1.1

For using layout you can use function useDashboard!!!
It provides adding and deleting functionality.
Check out the usage example below!

BreakpointWidth is now the last size at which the layout is visible.

Item schema has been changed! Now it has v-model functionality and settings binding.
Check out the usage example below!

## ⚙️ Installation

```sh
$ npm install vue3-responsive-dash
```

## 📄 Documents

[Link](https://vue-responsive-dash.netlify.com/)

## 🚀 How to use

```vue
<script setup lang="ts">
import {
  Dashboard,
  DashLayout,
  DashItem,
  DashboardLayout,
  useDashboard,
} from "vue3-responsive-dash";
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
```

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions or requests or want to contribute to `vue3-responsive-dash` or other packages, please write the [issue](https://github.com/Stawlie/vue3-responsive-dash/issues) or give me a Pull Request freely.

## 🐞 Bug Report

If you find a bug, please report to us opening a new [Issue](https://github.com/Stawlie/vue3-responsive-dash/issues) on GitHub.

## ⚙️ Development

### `npm run serve`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
