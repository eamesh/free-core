<script setup lang="ts">
// import { ref } from 'vue';
// import { NButton } from 'naive-ui';
import { Free, FreeLayout, FreeTitleTextWidget, FreeWhiteHeightWidget } from '../src';
import { AsideGroup } from '../src/core/src/interface';

// Free.widgets = [
//   FreeTitleTextWidget,
//   FreeWhiteHeightWidget
// ];

const asideWidgets: AsideGroup[] = [
  {
    title: '基础组件',
    key: 'base',
    children: [
      FreeTitleTextWidget,
      FreeWhiteHeightWidget
    ]
  },
  {
    title: '营销组件',
    key: 'func',
    children: [
      FreeTitleTextWidget,
      FreeWhiteHeightWidget
    ]
  }
];

Free.widgets = asideWidgets;

// const freeRef = ref();
// function handleSubmit () {
//   console.log(freeRef.value.getPageData());
//   const {
//     page,
//     core
//   } = freeRef.value.getPageData();

//   console.log(page, core);
// }
</script>

<template>
  <!-- <NButton
    type="primary"
    style="position: absolute; z-index: 1000; top: 0; right: 500px;"
    @click="handleSubmit"
  >
    发布
  </NButton> -->
  <FreeLayout
    ref="freeRef"
    aside-group
  />
</template>

<style>
/* @import "../lib/style.css"; */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
}
</style>
