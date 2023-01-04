

<template ref="srp">
  <div id="searchRoot">
    <div id="loading-result" class="center-horizontal">
      <img src="../assets/loading.gif" class="loading-image"/>
    </div>
  </div>
  <div id="more-content-button-root" class="center-horizontal">
    <MoreContentButton :show="show"/>
  </div>
  <ViewTemplatesPage v-for="(dat) in content"
                     :choosenView="dat.choosenView"
                     :url="dat.url"
                     :headline="dat.headline"
                     :pluginName="dat.pluginName"
                     :teaser="dat.teaser"
                     :image="dat.image"
                     :date="dat.date"
                     :price="dat.price"
                     :artist="dat.artist"
                     :release="dat.release"
                     :tags="dat.tags"
                     :genre="dat.genre"
                     :type="dat.type"
                     :publisher="dat.publisher"
                     :appIcon="dat.appIcon"
  />
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
      content: {}
    };
  },

  created() {
    EventBus.addEventListener('data-sender', (event) => {
      this.content = event.data;
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