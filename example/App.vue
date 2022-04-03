<script setup lang="ts">
import { Free, FreeLayout, FreeTitleTextWidget, FreeWhiteHeightWidget } from '../src';

Free.widgets = [
  FreeTitleTextWidget,
  FreeWhiteHeightWidget
];
</script>

<template>
  <FreeLayout :aside-group="false" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
