<template>
  <PageHeader :pageName="'Profile Information'" />
  <div class="card">
    <div class="container">
      <div>
        <div class="image bg-primary">
          <img
            src="../assets/profile/photo_5798431688026603715_y.jpg"
            alt=""
            width="150px"
          />
        </div>
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
.image,
.image > img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.image {
  border-radius: 50%;
  padding: 3px;
  background-color: rgb(140, 140, 254);
}

.image > img {
}
@media screen and (max-width: 1200px) {
  .container {
    flex-flow: column;
  }
}
</style>
