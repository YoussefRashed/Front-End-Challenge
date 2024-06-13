<template>
  <div class="container">
    <div class="sidebar">
      <SideMenu :links="links" />
    </div>
    <div class="content fade-in">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from "../src/components/layout/SideMenu";
let links: string[];
links = ["payment"];
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: [sidebar] 25% [router-view]75%;
  grid-gap: 5px;
}
.content {
  grid-column: router-view;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}
</style>
