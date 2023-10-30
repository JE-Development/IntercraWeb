<template>
  <div class="view-border content-layout-color">
      <div class="center-horizontal">

          <div :id="'atContainer' + this.index + '-' + adsIdBanner"></div>
          <div :id="'atContainer' + this.index + '.1-' + adsIdBanner" class="small-hidden"></div>

      </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SavedIconView from "../views/SavedIconView.vue";

export default {
  name: "AdsView",
    components: {SavedIconView},
  props: {
    index: Number,
  },

    data(){
        return {
            adsIdBanner: "cf408d86b5915d37b8e8c46e45304282"
        };
    },

  mounted() {
  },


}
</script>

<style scoped>

</style>