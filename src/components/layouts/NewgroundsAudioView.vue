<template>
  <div class="view-border content-layout-color display-flex">
    <div class="content-layout-color center-horizontal ng-image-div">
      <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image ng-image"/></a>
    </div>
    <div class="ng-audio-content match-parent">
      <div>
        <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
        <h4 class="teaser-color">{{artist}}</h4>
        <h4 class="teaser-color">{{genre}}</h4>
        <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
        <div v-if="savedContent">
          <div class="saved-content-div center-horizontal">
            <a @click="savedClick"><img src="../../assets/arrow_left.png" class="saved-content-icon"/></a>
          </div>
        </div>
        <div v-else class="saved-content-right">
          <div class="saved-content-div center-horizontal">
            <a @click="savedClick"><img src="../../assets/arrow_right.png" class="saved-content-icon"/></a>
          </div>
        </div>
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