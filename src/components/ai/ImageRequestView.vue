<template>
  <GeneratedImagesPopup :show="imageShow" @close="closeImagePopup" :id="id"/>
  <div class="feedback-view-border content-layout-color" style="overflow: hidden">
    <div style="overflow: hidden">

      <div class="center-horizontal" v-if="status === '2'">
        <UsageButton :onClick="seeImageClicked" width="230" height="30" padding="0px 0px">
          <p class="white" style="font-size: 18px">see generated images</p>
        </UsageButton>
      </div>

      <a class="error-color pointer" style="overflow: hidden" v-if="status !== '2'" @click="deleteClicked">delete</a>
      <h3 :class="'ai-code-color-' + status">{{headline}}</h3>
      <h4 class="text-black">by {{artist}}</h4>
      <h4 class="decent-color">seed: {{seed}}</h4>
      <h4 class="decent-color">model: {{checkpoint}}</h4>

    </div>
  </div>
</template>

<script>
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SavedIconView from "../views/SavedIconView.vue";
import {FirebaseController} from "../intercraSystemCode/controllers/FirebaseController";
import UsageButton from "../views/UsageButton.vue";
import GeneratedImagesPopup from "../views/GeneratedImagesPopup.vue";
export default {
  name: "ImageRequestView",
  components: {GeneratedImagesPopup, UsageButton, SavedIconView},
  props: {
    headline: String,
    artist: String,
    checkpoint: String,
    seed: Number,
    status: String,
    id: String,
    onDeleteCallback: {
      type: Function,
    },
  },

  data(){
    return {
      displayPrice: "",
      isHtml: false,
      imageShow: false
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
    },
    deleteClicked(){
      let fc = new FirebaseController()
      fc.deleteImageRequest(this.id)
      this.onDeleteCallback()
    },
    seeImageClicked(){
      this.imageShow = true
    },

    closeImagePopup(){
      this.imageShow = false
    }
  }
}
</script>

<style scoped>
</style>