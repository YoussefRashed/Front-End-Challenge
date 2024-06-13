<template>
  <PageHeader :pageName="'Profile '" />
  <div class="card">
    <div class="profile-container">
      <div>
        <div class="image bg-primary">
          <img
            src="../../assets/profile/profile-img.jpg"
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
import PageHeader from "../../components/layout/PageHeader.vue";
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.image,
.image > img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transition: 0.4s 0.1s linear;
}
.image:hover {
  box-shadow: 1px 1px 50px #4b4198;
  transform: translateY(-5px);
}
.image {
  border-radius: 50%;
  padding: 3px;
  background-color: rgb(140, 140, 254);
}
.item > h2 {
  color: rgb(140, 140, 254);
}
@media screen and (max-width: 1200px) {
  .profile-container {
    flex-flow: column;
  }
}
</style>
