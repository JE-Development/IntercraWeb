<template>
<div class="nav">
  <div class="nav-div center-horizontal">
    <h3 class="nav-module center-horizontal white" @click="click1">About Intercra</h3>
      <div class="nav-space"></div>
    <h3 class="nav-module center-horizontal white" @click="click2">Privacy Policy / Terms of Use</h3>
      <div class="nav-space"></div>
    <h3 class="nav-module center-horizontal white" @click="click3">Social Media</h3>
  </div>
<!--</div>
    <div class="fullwidth center-horizontal">
        <div class="center-horizontal nav nav-sub">
            <h3 class="nav-module center-horizontal complementary-color" @click="suggestions">Suggestions</h3>
            <div style="width: 60px"></div>
            <h3 class="nav-module center-horizontal complementary-color" @click="ai">AI Images</h3>
        </div>/!-->
    </div>
</template>

<script>
import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "MainNav",


  methods: {
    click1(){
      window.location.href = "http://project.intercra.com";
    },
    click2(){
      window.location.href = "https://intercra.com/#/impressum";
    },
    click3(){
      EventBus.emit("show-social-media")
    },
      suggestions(){
          EventBus.emit("open-feedback")
      },
      ai(){
          //EventBus.emit("show-social-media")
      },
  }

}
</script>