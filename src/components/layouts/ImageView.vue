<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url">
          <img :src="image" class="center-horizontal view-image"/>
        </a>
      </div>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
      <a @click="savedClick">save</a>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "ImageView",

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    image: String,
    pluginName: String,
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