<template>
  <div class="plugin-view center-vertical">
    <img src="../../assets/cross_white.png" style="width: 20px; height: 20px" class="pointer" @click="clickedRemove" v-if="showRemove"/>
    <div style="width: 10px"></div>
    <h2 class="white">{{name}}</h2>
  </div>
</template>

<script>
import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "PluginSettings",

  props: {
    name: String,
      onRemove: {
          type: Function,
          required: true,
      },
      showRemove: Boolean
  },
  //emits: ['click']

  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(true){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
    clickedRemove(){
      this.onRemove(this.name)
    }
  },
}
</script>