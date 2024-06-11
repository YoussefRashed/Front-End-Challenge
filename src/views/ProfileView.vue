<template>
  <PageHeader :pageName="'Profile Information'" />
  <div class="card">
    <div class="container">
      <div class="image">
        <img src="../assets/logo.png" alt="" width="150px" />
      </div>
      <div class="information">
        <div class="item">
          <h2>Name</h2>
          <h3>Yousef Ashraf Mohammed Abd Al Rahman</h3>
        </div>
        <div class="item">
          <h2>Gender</h2>
          <h3>Male</h3>
        </div>

        <div class="item">
          <h2>Date of Birth</h2>
          <h3>30/9/2002</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageHeader from "../components/layout/PageHeader";
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
@media screen and (max-width: 1200px) {
  .container {
    flex-flow: column;
  }
  .header {
    text-align: center;
  }
}
</style>
