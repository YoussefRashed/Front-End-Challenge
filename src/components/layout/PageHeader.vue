<template>
  <h1 class="header">{{ pageName }}</h1>
</template>

<script setup lang="ts">
import defineProps from "vue";
defineProps<{ pageName: string }>();
</script>

<style>
.header {
  margin: 100px 0px;
}
</style>
