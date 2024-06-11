<template>
  <h1>{{ pageName }}</h1>
</template>

<script setup lang="ts">
import defineProps from "vue";
defineProps<{ pageName: string }>();
</script>
