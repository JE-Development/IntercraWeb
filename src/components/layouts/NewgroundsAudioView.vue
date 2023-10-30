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
      <SavedIconView
              :isResult="isResult"
              :savedContent="savedContent"
              :onClick="savedClick"
      />
  </div>

</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SavedIconView from "../views/SavedIconView.vue";

export default {
  name: "NewgroundsAudioView",
    components: {SavedIconView},
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
      isResult: Boolean,
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