<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image" ref="image"/></a>
      </div>
      <h2 class="border-width"><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="complementary-color bold">{{type}}</h3>
      <h3 class="text-black">{{price}}</h3>
      <h4 class="teaser-color">{{artist}}</h4>
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
  name: "ITunesView",
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