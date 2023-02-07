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
    url: String,
    image: String,
    pluginName: String,
  },

  methods: {
    savedClick(){
      EventBus.emit("save-result", this.index)
    }
  }
}
</script>

<style scoped>

</style>