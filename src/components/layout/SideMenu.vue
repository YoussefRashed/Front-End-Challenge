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

/* Sidebar links */
.sidebar .routeLink {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

/* Active/current link */
.sidebar .routeLink.router-link-exact-active {
  background-color: #04aa6d;
  color: white;
}

/* Links on mouse-over */
.sidebar .routeLink:hover:not(.active) {
  background-color: #555;
  color: white;
}

/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
/* div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
} */

/* On screens that are less than 700px wide, make the sidebar into a topbar */
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

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
  .sidebar .routeLink {
    text-align: center;
    float: none;
  }
}
</style>
