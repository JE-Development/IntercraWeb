<template>
<div class="nav">
  <div class="div-left center-horizontal">
    <h3 class="nav-module center-horizontal black" @click="click1">About Intercra</h3>
    <h3 class="nav-module center-horizontal black" @click="click2">YouTube</h3>
    <h3 class="nav-module center-horizontal black" @click="click3">Instagram</h3>
    <h3 class="nav-module center-horizontal nav-complementary" @click="click4">Settings</h3>
  </div>
</div>
</template>

<script>
export default {
  name: "MainNav",


  methods: {
    click1(){
      window.location.href = "http://project.intercra.com";
    },
    click2(){
      window.location.href = "https://www.youtube.com/@interation4031/videos";
    },
    click3(){
      window.location.href = "https://www.instagram.com/lcj.development/";
    },
    click4(){

    },
  }

}
</script>