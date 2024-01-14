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

## ⚙️ Installation

```sh
$ npm install vue3-responsive-dash
```

## 📄 Documents

[Link](https://vue-responsive-dash.netlify.com/)

## 🚀 How to use

```vue
<script setup>
import { Dashboard, DashLayout, DashItem } from "vue-3-responsive-dash";
import { ref } from "vue";

const layouts = ref([
  {
    breakpoint: "cols10",
    numberOfCols: 10,
    breakpointWidth: 1919,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 2, y: 0, width: 2, height: 1 },
      { id: "3", x: 4, y: 0, width: 1, height: 1 },
      { id: "4", x: 5, y: 0, width: 1, height: 1 },
      { id: "5", x: 6, y: 0, width: 1, height: 1 },
      { id: "6", x: 7, y: 0, width: 1, height: 1 },
      { id: "7", x: 8, y: 0, width: 1, height: 1 },
      { id: "8", x: 9, y: 0, width: 1, height: 1 },
    ],
  },
  {
    breakpoint: "cols9",
    numberOfCols: 9,
    breakpointWidth: 1729,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 2, y: 0, width: 2, height: 1 },
      { id: "3", x: 4, y: 0, width: 1, height: 1 },
      { id: "4", x: 5, y: 0, width: 1, height: 1 },
      { id: "5", x: 6, y: 0, width: 1, height: 1 },
      { id: "6", x: 7, y: 0, width: 1, height: 1 },
      { id: "7", x: 8, y: 0, width: 1, height: 1 },
      { id: "8", x: 2, y: 1, width: 1, height: 1 },
    ],
  },
  {
    breakpoint: "cols8",
    numberOfCols: 8,
    breakpointWidth: 1539,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 2, y: 0, width: 2, height: 1 },
      { id: "3", x: 4, y: 0, width: 1, height: 1 },
      { id: "4", x: 5, y: 0, width: 1, height: 1 },
      { id: "5", x: 6, y: 0, width: 1, height: 1 },
      { id: "6", x: 7, y: 0, width: 1, height: 1 },
      { id: "7", x: 2, y: 1, width: 1, height: 1 },
      { id: "8", x: 3, y: 1, width: 1, height: 1 },
    ],
  },
  {
    breakpoint: "cols7",
    numberOfCols: 7,
    breakpointWidth: 1349,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 2, y: 0, width: 2, height: 1 },
      { id: "3", x: 4, y: 0, width: 1, height: 1 },
      { id: "4", x: 5, y: 0, width: 1, height: 1 },
      { id: "5", x: 6, y: 0, width: 1, height: 1 },
      { id: "6", x: 2, y: 1, width: 1, height: 1 },
      { id: "7", x: 3, y: 1, width: 1, height: 1 },
      { id: "8", x: 4, y: 1, width: 1, height: 1 },
    ],
  },
  {
    breakpoint: "cols6",
    numberOfCols: 6,
    breakpointWidth: 1159,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 2, y: 0, width: 2, height: 1 },
      { id: "3", x: 4, y: 0, width: 1, height: 1 },
      { id: "4", x: 5, y: 0, width: 1, height: 1 },
      { id: "5", x: 2, y: 1, width: 1, height: 1 },
      { id: "6", x: 3, y: 1, width: 1, height: 1 },
      { id: "7", x: 4, y: 1, width: 1, height: 1 },
      { id: "8", x: 5, y: 1, width: 1, height: 1 },
    ],
  },
  {
    breakpoint: "cols5",
    numberOfCols: 5,
    breakpointWidth: 969,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 2, y: 0, width: 2, height: 1 },
      { id: "3", x: 4, y: 0, width: 1, height: 1 },
      { id: "4", x: 2, y: 1, width: 1, height: 1 },
      { id: "5", x: 3, y: 1, width: 1, height: 1 },
      { id: "6", x: 4, y: 1, width: 1, height: 1 },
      { id: "7", x: 0, y: 2, width: 1, height: 1 },
      { id: "8", x: 1, y: 2, width: 1, height: 1 },
    ],
  },
  {
    breakpoint: "cols4",
    numberOfCols: 4,
    breakpointWidth: 779,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 2, y: 0, width: 2, height: 1 },
      { id: "3", x: 2, y: 1, width: 1, height: 1 },
      { id: "4", x: 3, y: 1, width: 1, height: 1 },
      { id: "5", x: 0, y: 2, width: 1, height: 1 },
      { id: "6", x: 1, y: 2, width: 1, height: 1 },
      { id: "7", x: 2, y: 2, width: 1, height: 1 },
      { id: "8", x: 3, y: 2, width: 1, height: 1 },
    ],
  },
  {
    breakpoint: "cols3",
    numberOfCols: 3,
    breakpointWidth: 589,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 0, y: 2, width: 2, height: 1 },
      { id: "3", x: 2, y: 0, width: 1, height: 1 },
      { id: "4", x: 2, y: 1, width: 1, height: 1 },
      { id: "5", x: 2, y: 2, width: 1, height: 1 },
      { id: "6", x: 0, y: 3, width: 1, height: 1 },
      { id: "7", x: 1, y: 3, width: 1, height: 1 },
      { id: "8", x: 2, y: 3, width: 1, height: 1 },
    ],
  },
  {
    breakpoint: "cols2",
    numberOfCols: 2,
    breakpointWidth: 399,
    items: [
      { id: "1", x: 0, y: 0, width: 2, height: 2 },
      { id: "2", x: 0, y: 2, width: 2, height: 1 },
      { id: "3", x: 0, y: 3, width: 1, height: 1 },
      { id: "4", x: 1, y: 3, width: 1, height: 1 },
      { id: "5", x: 0, y: 4, width: 1, height: 1 },
      { id: "6", x: 1, y: 4, width: 1, height: 1 },
      { id: "7", x: 0, y: 5, width: 1, height: 1 },
      { id: "8", x: 1, y: 5, width: 1, height: 1 },
    ],
  },
]);
</script>

<template>
  <div id="app">
    <dashboard id="dashExample">
      <dash-layout
        v-for="layout in layouts"
        v-bind="layout"
        :key="layout.breakpoint"
      >
        <dash-item
          v-for="item in layout.items"
          v-model:x="item.x"
          v-model:y="item.y"
          v-model:width="item.width"
          v-model:height="item.height"
          :id="item.id"
          :key="item.id"
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
