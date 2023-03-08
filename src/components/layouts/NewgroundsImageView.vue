<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url">
          <img :src="image" class="center-horizontal view-image"/>
        </a>
      </div>
      <h2 class="border-width"><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="text-black">{{artist}}</h3>
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
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "NewgroundsImageView",

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    image: String,
    pluginName: String,
    headline: String,
    artist: String,
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