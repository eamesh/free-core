<script setup lang="ts">
import { NButton } from 'naive-ui';
import { ref } from 'vue';
import { Free, FreeLayout, FreeTitleTextWidget, FreeWhiteHeightWidget, FreePageWidget } from '../src';
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

const freeRef = ref();
// function handleSubmit () {
//   console.log(freeRef.value.getPageData());
//   const {
//     page,
//     core
//   } = freeRef.value.getPageData();

//   console.log(page, core);
// }

function handleClick () {
  freeRef.value.setPageData({
    core: [
      {
        ...FreePageWidget,
        data: {
          title: '默认页面',
          description: '',
          backgroundColor: '#f7f8fa'
        }
      }
    ]
  });
}
// setTimeout(() => {
//   console.log(freeRef.value.getPageData(), 'asd');
// });
// }
</script>

<template>
  <NButton
    type="primary"
    style="position: absolute; z-index: 1000; top: 0; right: 500px;"
    @click="handleClick"
  >
    发布
  </NButton>
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
