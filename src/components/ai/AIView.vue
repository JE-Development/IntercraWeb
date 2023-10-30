<template>
  <div class="feedback-view-border content-layout-color" style="overflow: hidden">
    <div style="overflow: hidden">

      <div class="content-layout-color center-horizontal">
        <a :href="image" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h3><a :href="image" class="headline-color">{{headline}}</a></h3>
      <h4 class="text-black">by {{artist}}</h4>
      <h4 class="decent-color">seed: {{seed}}</h4>
      <h4 class="decent-color">model: {{checkpoint}}</h4>

    </div>
  </div>
</template>

<script>
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SavedIconView from "../views/SavedIconView.vue";
export default {
  name: "AIView",
    components: {SavedIconView},
  props: {
    headline: String,
    image: String,
    artist: String,
    checkpoint: String,
    seed: Number
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