<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h3 class="complementary-color bold">{{album}}</h3>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="teaser-color">{{artist}}</h3>
      <h4 class="teaser-color">{{duration}}</h4>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
      <a @click="savedClick">save</a>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "SpotifyView",

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    artist: String,
    duration: String,
    album: String,
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