<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h2 class="border-width"><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3>{{price}}</h3>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
      <a @click="savedClick">save</a>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "ShoppingView",

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    price: String,
  },

  methods: {
    savedClick(){
      if(!this.savedContent) {
        EventBus.emit("save-result", this.index)
      }else{
        EventBus.emit("save-remove", this.index)
      }
    }
  }
}
</script>

<style scoped>

</style>