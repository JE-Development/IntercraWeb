<template>
  <div class="view-border content-layout-color">
    <div class="display-flex" style="overflow: hidden">
      <div class="content-layout-color center-horizontal ng-image-div">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image ng-image"/></a>
      </div>
      <div class="ng-audio-content match-parent">
        <div>
          <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
          <h4 class="text-black">{{teaser}}</h4>
          <h4 class="teaser-color">{{artist}}</h4>
          <h4 class="teaser-color">{{genre}}</h4>
          <h4 class="teaser-color">{{date}}</h4>
          <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>

        </div>
      </div>
    </div>
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

</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "NewgroundsAudioView",
  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    image: String,
    artist: String,
    genre: String,
    date: String,
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