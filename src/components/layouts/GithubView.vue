<template>
  <div class="view-border content-layout-color">
    <div>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <p class="text-black">{{teaser}}</p>
      <p class="teaser-color">{{lang}}</p>
      <p class="plugin-name-color view-plugin-name">Plugin: {{pluginName}}</p>
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
  name: "GithubView",

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    lang: String,
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