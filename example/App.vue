<script setup lang="ts">
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
</script>

<template>
  <FreeLayout aside-group />
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
