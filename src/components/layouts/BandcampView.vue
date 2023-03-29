<template>
  <div class="view-border content-layout-color">
    <div>
      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h3 class="complementary-color bold">{{type}}</h3>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="teaser-color">{{artist}}</h3>
      <h4 class="teaser-color">{{release}}</h4>
      <h4 class="teaser-color">{{tags}}</h4>
      <h4 class="teaser-color">{{genre}}</h4>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
      <div v-if="savedContent">
        <div class="saved-content-div center-horizontal">
          <a @click="savedClick"><img class="saved-content-icon image-arrow-left"/></a>
        </div>
      </div>
      <div v-else class="saved-content-right">
        <div class="saved-content-div center-horizontal">
          <a @click="savedClick"><img class="saved-content-icon image-arrow-right"/></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "BandcampView",

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    artist: String,
    release: String,
    tags: String,
    genre: String,
    type: String,
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