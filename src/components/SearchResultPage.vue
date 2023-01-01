

<template ref="srp">
  <div id="searchRoot">
    <div id="loading-result" class="center-horizontal">
      <img src="../assets/loading.gif" class="loading-image"/>
    </div>
  </div>
  <div id="more-content-button-root" class="center-horizontal">
    <MoreContentButton :show="show"/>
  </div>
  <ViewTemplatesPage :choosen-view="type" :plugin-name="pn" ref="vtp"/>
</template>


<script>
import {IntercraController} from "../components/intercraSystemCode/controllers/IntercraController"
import MoreContentButton from "../components/MoreContentButton.vue";
import ViewTemplatesPage from "../components/ViewTemplatesPage.vue";
import EventBus from "./intercraSystemCode/classes/EventBusEvent"

export default {
  name: "SearchResultPage",
  components: {ViewTemplatesPage, MoreContentButton},


  data(){
    return {
      search: this.$route.params.search,
      plugin: this.$route.params.plugin,
      show: false,
      type: 'informationView',
      pn: 'internal plugin'
    };
  },

  created() {
    EventBus.addEventListener('data-sender', (event) => {
      console.log(event.data.content)
      this.type = event.data.content;
      this.pn = event.data.content;
    })
  },
  mounted() {

    let ic = new IntercraController();
    ic.startSearch(this.search, this.plugin);

    ic.changeShow();

  },
  methods: {

    updateSearch: function (){
      this.show = true;
      console.log("hello in update: " + this.show);
    }
  }
}
</script>