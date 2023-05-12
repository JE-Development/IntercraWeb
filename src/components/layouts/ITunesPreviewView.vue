<template>
  <div class="view-border content-layout-color">
    <div>
      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image" ref="image"/></a>
      </div>

      <vue-slider
          v-if="isPlaying"
          duration="0.2"
          :max="audioMax"
          ref="slider"
          @drag-start="dragStart"
          @drag-end="dragEnd"
          @click="dragEnd"
          tooltip="none"
          :process-style="{ backgroundColor: '#00ff00' }"></vue-slider>

      <div class="view-audio-outer" v-if="preview!=='null'">
        <div class="view-content-inner">
          <h2 class="border-width"><a :href="url" class="headline-color">{{headline}}</a></h2>
          <h3 class="complementary-color bold">{{type}}</h3>
          <h3 class="text-black">{{price}}</h3>
          <h4 class="teaser-color">{{artist}}</h4>
          <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
        </div>
        <div class="audio-play">
          <div class="audio-border complementary-color center" @click="playPauseClicked()">
            <img src="../../assets/play.png" class="audio-image" v-if="!isPlaying">
            <img src="../../assets/pause.png" class="audio-image" v-else>
          </div>
        </div>
      </div>
        <SavedIconView
                :isResult="isResult"
                :savedContent="savedContent"
                :onClick="savedClick"
        />
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SavedIconView from "../views/SavedIconView.vue";

export default {
  name: "ITunesPreviewView",
    components: {SavedIconView},

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    price: String,
    artist: String,
    type: String,
    scaleIndex: String,
    preview: String,
      isResult: Boolean,
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
      this.audioMax = parseInt(event.data*100);
    })
  },

  data() {
    return {
      isPlaying: false,
      audioMax: 0,
    }
  },

  mounted() {
    if(this.scaleIndex != null && this.scaleIndex != ""){
      this.$refs.image.style.width = this.scaleIndex + "px";
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