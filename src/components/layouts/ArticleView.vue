<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image" ref="image"/></a>
      </div>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="complementary-color bold">{{platform}}</h3>
      <h3 class="text-black">{{teaser}}</h3>
      <h4 class="teaser-color">{{author}}</h4>
      <h4 class="teaser-color">{{date}}</h4>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
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
  name: "ArticleView",
    components: {SavedIconView},
  props: {
    index: Number,
    savedContent: Boolean,
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    image: String,
    date: String,
    platform: String,
    author: String,
    scaleIndex: String,
    isResult: Boolean,
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
    }
  }

}
</script>

<style scoped>

</style>