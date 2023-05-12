<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <div class="display-flex">
        <div class="app-content-width">
          <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
          <h3 class="text-black">{{publisher}}</h3>
          <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
            <SavedIconView
                    :isResult="isResult"
                    :savedContent="savedContent"
                    :onClick="savedClick"
            />
          <div class="icon-view">
            <img :src="appIcon" class="play-store-icon-image"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SavedIconView from "../views/SavedIconView.vue";

export default {
  name: "PlayStoreView",
    components: {SavedIconView},

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    appIcon: String,
    publisher: String,
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