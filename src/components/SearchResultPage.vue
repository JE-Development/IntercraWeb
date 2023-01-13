

<template ref="srp">
  <div class="center-horizontal result-search">
    <a href="https://intercra.com">
      <img src="../assets/intercra-text.png" class="result-image center-horizontal"/>
    </a>
  </div>
  <div class="center-horizontal">
    <input
        @keyup.enter="enterClicked()"
        id="result-input-search"
        placeholder="Search here"
        :value="search"
        class="search-input center-horizontal search-input-color search-input-border-color">

  </div>
  <div id="searchRoot" v-if="waitingPlugins">
    <div id="loading-result" class="center-horizontal">
      <img src="../assets/loading-circle.gif" class="loading-image"/>
    </div>
  </div>

  <div class="center-horizontal waiting-margin headline-color" v-if="waitingPlugins">
    <h2>Waiting for:</h2>
  </div>

  <WaitingPlugins v-for="(dat) in waitingPlugins" :data="dat"/>

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
                     :platform="dat.platform"
  />
</template>


<script>
import {IntercraController} from "../components/intercraSystemCode/controllers/IntercraController"
import MoreContentButton from "../components/MoreContentButton.vue";
import ViewTemplatesPage from "../components/ViewTemplatesPage.vue";
import EventBus from "./intercraSystemCode/classes/EventBusEvent"
import WaitingPlugins from "./WaitingPlugins.vue";

export default {
  name: "SearchResultPage",
  components: {ViewTemplatesPage, MoreContentButton, WaitingPlugins},


  data(){
    return {
      search: this.$route.params.search,
      plugin: this.$route.params.plugin,
      show: false,
      content: {},
      relKey: 0,
      waitingPlugins: null,
      searchVisibility: true,
    };
  },

  created() {
    EventBus.addEventListener('data-sender', (event) => {
      this.content = event.data;
      this.waitingPlugins = false;
    })

    EventBus.addEventListener('not-finished', (event) => {
      this.waitingPlugins = event.data;
    })
  },
  mounted() {

    let ic = new IntercraController();
    ic.startSearch(this.search, this.plugin, this.$cookies.get("token"));

    ic.changeShow();

  },
  methods: {

    updateSearch: function (){
      this.show = true;
      console.log("hello in update: " + this.show);
    },

    enterClicked(){

      let searchText = document.getElementById("result-input-search").value;

      let route = this.$router.resolve({path: '/search/' + this.plugin + "/" + searchText});
      window.open(route.href, '_self');
      this.$router.go();
    },
  }
}
</script>