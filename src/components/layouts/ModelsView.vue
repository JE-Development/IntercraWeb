<template>
  <div class="view-border content-layout-color" style="overflow: hidden">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h2 class="border-width"><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="text-black">{{artist}}</h3>
      <h4 class="text-black" v-if="isHtml"><div v-html="displayPrice"></div></h4>
      <h4 class="text-black" v-else>{{price}}</h4>
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
  name: "ModelsView",
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
      isResult: Boolean,
  },

  data(){
    return {
      displayPrice: "",
      isHtml: false,
    };
  },

  created() {
    if(this.price !== undefined && this.price.includes("---html")){
      let split = this.price.split("---")
      this.displayPrice = split[0]
      this.isHtml = true;
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