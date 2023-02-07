<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <div class="display-flex">
        <div class="app-content-width">
          <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
          <h3>{{publisher}}</h3>
          <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
          <a @click="savedClick">save</a>
        </div>
        <div class="icon-view">
          <img :src="appIcon" class="play-store-icon-image"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "PlayStoreView",

  props: {
    index: Number,
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    appIcon: String,
    publisher: String,
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