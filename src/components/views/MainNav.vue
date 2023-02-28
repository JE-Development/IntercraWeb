<template>
<div class="nav">
  <div class="nav-div center-horizontal">
    <h3 class="nav-module center-horizontal black" @click="click1">About Intercra</h3>
    <h3 class="nav-module center-horizontal black" @click="click2">Impressum / Privacy Policy</h3>
    <h3 class="nav-module center-horizontal black" @click="click3">Social Media</h3>
  </div>
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
  }

}
</script>