<template>
    <CustomPopup :show="isShow" :onClose="closed">
        <div class="center-horizontal popup-width">
            <div>
                <a href="https://twitter.com/je_development" class="pointer download-list-item popup-width center" v-for="(dat) in sizeNumber">{{dat}}</a>
            </div>
        </div>
    </CustomPopup>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <img :src="image" class="center-horizontal view-image" ref="image"/>
      </div>
      <!--<div class="center-horizontal">
        <div class="usage-button-layout">
            <UsageButton :onClick="imageDownloadClicked" title=" Image"/>
            <UsageButton :onClick="vectorDownloadClicked" title=" Vector"/>
        </div>
      </div>
      /!-->
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
import UsageButton from "../views/UsageButton.vue";
import CustomPopup from "../views/CustomPopup.vue";
import SavedIconView from "../views/SavedIconView.vue";

export default {
  name: "IconDownloadView",
  components: {SavedIconView, CustomPopup, UsageButton},
  props: {
    index: Number,
    savedContent: Boolean,
    image: String,
    pluginName: String,
    scaleIndex: String,
    sizes: Array,
    vectorDownloadUrl: String,
      isResult: Boolean,
  },

  mounted() {
    if(this.scaleIndex != null && this.scaleIndex != ""){
      this.$refs.image.style.width = this.scaleIndex + "px";
    }

    for(let i = 0; i < this.sizes.length; i++){
        this.sizeNumber.push(this.sizes[i].split(";;;")[0] + "px")
    }

  },
    data(){
        return{
            isShow: false,
            sizeNumber: [],
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
      imageDownloadClicked(){
          this.isShow = true
      },
      vectorDownloadClicked(){

      },
      closed(){
        this.isShow = false
      }
  }
}
</script>

<style scoped>

</style>