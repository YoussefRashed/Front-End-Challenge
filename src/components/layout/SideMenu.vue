<template>
  <RouterLink class="routeLink" :to="'/'">Profile</RouterLink>
  <div v-for="(link, i) in links" :key="i">
    <!-- <span>{{ link }}</span> -->
    <RouterLink class="routeLink" :to="`/${link}`">Payment</RouterLink>
  </div>
</template>

<script setup lang="ts">
import defineProps from "vue";
defineProps<{
  links: string[];
}>();
</script>

<style>
.sidebar {
  grid-column: sidebar;
  margin: 0;
  padding: 0;
  width: 300px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar .routeLink {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar .routeLink.router-link-exact-active {
  background-color: #04aa6d;
  color: white;
}

.sidebar .routeLink:hover:not(.active) {
  background-color: #555;
  color: white;
}

@media screen and (max-width: 1200px) {
  .container {
    grid-template-columns: [sidebar] 20% [router-view]80%;
  }
  .sidebar {
    width: 150px;
  }
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar .routeLink {
    text-align: center;
    float: none;
  }
}
</style>
