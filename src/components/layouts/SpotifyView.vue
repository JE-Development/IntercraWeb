<template>
  <div class="view-border content-layout-color">
    <div>
      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <vue-slider v-if="isPlaying" duration="0.2" :max="audioMax" ref="slider" @drag-start="dragStart" @drag-end="dragEnd" @click="dragEnd" tooltip="none"></vue-slider>

      <div style="display: flex">
        <div>

          <h3 class="complementary-color bold">{{album}}</h3>
          <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
          <h3 class="teaser-color">{{artist}}</h3>
          <h4 class="teaser-color">{{duration}}</h4>
          <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
        </div>
        <div class="audio-play">
          <div class="audio-border complementary-color center" @click="playPauseClicked()">
            <img src="../../assets/play.png" class="audio-image" v-if="!isPlaying">
            <img src="../../assets/pause.png" class="audio-image" v-else>
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
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import firstGifFrame from "@/src/assets/intercra-gif-first.png";

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
    preview: String,
  },

  created() {
    EventBus.addEventListener('audio-reset-' + this.index, (event) => {
      this.isPlaying = false;
    })

    EventBus.addEventListener("audio-pos", (event) => {
      try{
        this.$refs.slider.setValue(parseInt(event.data*100))
      }catch (e){
        //undefined
      }
    })

    EventBus.addEventListener("audio-max", (event) => {
      console.log(parseInt("max: " + event.data*100))
      this.audioMax = parseInt(event.data*100);
    })
  },

  data() {
    return {
      isPlaying: false,
      audioMax: 0,
    }
  },

  methods: {
    savedClick(){
      if(!this.savedContent) {
        EventBus.emit("save-result", this.index)
      }else{
        EventBus.emit("save-remove", this.index)
      }
    },
    playPauseClicked(){
      if(this.isPlaying){
        this.isPlaying = false;
        EventBus.emit("audio-pause")
      }else{
        this.isPlaying = true;
        EventBus.emit("audio-play", this.preview + ";;;" + this.index)
      }
    },
    dragStart(){
      console.log("ausio pause")
      EventBus.emit("audio-pause")
    },
    dragEnd(){
      EventBus.emit("audio-play-dragged", this.$refs.slider.getValue())
    }
  }
}
</script>

<style scoped>

</style>