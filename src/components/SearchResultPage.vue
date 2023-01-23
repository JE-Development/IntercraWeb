

<template ref="srp">
  <div class="center-horizontal result-search">
    <a href="https://intercra.com">
      <img src="../assets/intercra-connected-text.png" class="result-image center-horizontal"/>
    </a>
  </div>
  <div class="center-horizontal">
    <input
        @keyup.enter="enterClicked()"
        id="result-input-search"
        placeholder="Search here"
        :value="search"
        class="search-input center-horizontal search-input-color search-input-border-color sticky">

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
                     :album="dat.album"
                     :duration="dat.duration"
  />

  <div v-if="errors.length > 0">
    <h3 class="center-horizontal error-color">Error in:</h3>
    <div v-for="(err) in errors" class="center-horizontal">
      <h4 class="error-color">{{err}}</h4>
    </div>
  </div>

  <div id="searchRoot" v-if="showLoading">
    <div id="loading-result" class="center-horizontal">
      <img src="../assets/loading.gif" class="loading-image"/>
    </div>
  </div>

  <div class="center-horizontal waiting-margin headline-color" v-if="waitingPlugins">
    <h2>Waiting for:</h2>
  </div>

  <WaitingPlugins v-for="(dat) in waitingPlugins" :data="dat"/>

  <div id="more-content-button-root" class="center-horizontal">
    <MoreContentButton :show="show" :search="search" :plugin="plugin"/>
  </div>

</template>


<script>
import {IntercraController} from "../components/intercraSystemCode/controllers/IntercraController"
import MoreContentButton from "../components/MoreContentButton.vue";
import ViewTemplatesPage from "../components/ViewTemplatesPage.vue";
import EventBus from "./intercraSystemCode/classes/EventBusEvent"
import WaitingPlugins from "./WaitingPlugins.vue";
import {SpotifyController} from "./intercraSystemCode/controllers/SpotifyController";
import {contains} from "cheerio";

export default {
  name: "SearchResultPage",
  components: {ViewTemplatesPage, MoreContentButton, WaitingPlugins},


  data(){
    return {
      search: String(this.$route.params.search),
      plugin: String(this.$route.params.plugin),
      show: false,
      content: [],
      relKey: 0,
      waitingPlugins: null,
      searchVisibility: true,
      showLoading: true,
      errors: [],
    };
  },

  created() {
    EventBus.addEventListener('data-sender', (event) => {
      if(this.content.length <= 0){
        this.content = event.data;
      }else{
        this.content = this.content.concat(event.data);
      }
      this.waitingPlugins = false;
      this.show = true;
      this.showLoading = false;
    })

    EventBus.addEventListener('error-sender', (event) => {
      this.errors = event.data;
      this.waitingPlugins = false;
      this.showLoading = false;
      if(this.content.length > 0){
        this.show = true;
      }
    })

    EventBus.addEventListener('not-finished', (event) => {
      this.waitingPlugins = event.data;
    })

    EventBus.addEventListener('show-loading', (event) => {
      this.showLoading = true;
      this.show = false;
    })

    EventBus.addEventListener('login-circle', (event) => {
      let sc = new SpotifyController();
      sc.login();
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
    },

    enterClicked(){

      let searchText = document.getElementById("result-input-search").value;

      let route = this.$router.resolve({path: '/search/' + this.plugin + "/" + searchText});
      window.open(route.href, '_self');
      this.$router.go();
    },
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(this.isCookiesAllowed()){
        return this.$cookies.set(key, value);
      }
    },
    isCookiesAllowed(){
      let allow = this.getCookies("cookiesAllowed");
      if(allow == "false"){
        return false;
      }else if (allow == "true"){
        return true;
      }else{
        return null;
      }
    },
  }
}
</script>