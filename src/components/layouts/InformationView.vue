<template>
  <div class="view-border content-layout-color">
    <div>
      <a :href="url" class="visible-link-color" style="overflow: hidden">{{url}}</a>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <p class="teaser-color">{{teaser}}</p>
      <p class="plugin-name-color view-plugin-name">Plugin: {{pluginName}}</p>
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
  name: "InformationView",
    components: {SavedIconView},

  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    isResult: Boolean,
  },

  methods: {
    savedClick(){
      if(!this.savedContent) {
        console.log("information")
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