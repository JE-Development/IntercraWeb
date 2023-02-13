

<template ref="srp">
  <SavedPopup :show="showPopup" @show-popup="showFromPopup" :saved-content="savedContent"/>
  <div class="center-horizontal">
    <div>
      <a href="https://intercra.com">
        <img src="../assets/intercra-connected-text.png" class="result-image center-horizontal"/>
      </a>
      <input
          @keyup.enter="enterClicked()"
          id="result-input-search"
          placeholder="Search here"
          :value="search"
          class="search-input center-horizontal search-input-color search-input-border-color">
    </div>

  </div>

  <div v-if="errors.length > 0">
    <h3 class="center-horizontal error-color">Error in:</h3>
    <div v-for="(err) in errors" class="center-horizontal">
      <h4 class="error-color">{{err}}</h4>
    </div>
  </div>

  <SortingView :enabled="sorting"/>

  <div class="center-horizontal sticky top-position" v-if="!checkScreenSize() && hasSaved()">
    <SavedContentButton :show="true"/>
  </div>

  <div class="center-horizontal" style="display: flex">
    <div class="main-results center-horizontal">
      <div>
        <ViewTemplatesPage v-for="(dat, id) in content"
                           :index="id"
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
                           :lang="dat.lang"
        />
      </div>
    </div>
    <div style="width: 30px" v-if="checkScreenSize()"></div>
    <div class="view-border-saved sticky" v-if="savedContent.length != 0 && checkScreenSize()">
      <div ref="header" class="outer-scroll">
        <perfect-scrollbar>
          <ViewTemplatesPage v-for="(dat, id) in savedContent"
                             :index="id"
                             :savedContent="true"
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
                             :lang="dat.lang"
          />
        </perfect-scrollbar>
      </div>
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
    <MoreContentButton :show="show" :search="search" :plugin="plugin" :ic="ic"/>
  </div>

</template>


<script>
import {IntercraController} from "../components/intercraSystemCode/controllers/IntercraController"
import MoreContentButton from "./views/MoreContentButton.vue";
import ViewTemplatesPage from "../components/ViewTemplatesPage.vue";
import EventBus from "./intercraSystemCode/classes/EventBusEvent"
import WaitingPlugins from "./views/WaitingPlugins.vue";
import {SpotifyController} from "./intercraSystemCode/controllers/SpotifyController";
import SortingView from "../components/views/SortingView.vue";
import SavedContentButton from "../components/views/SavedContentButton.vue";
import SavedPopup from "../components/views/SavedPopup.vue";

export default {
  name: "SearchResultPage",
  components: {SavedContentButton, SortingView, ViewTemplatesPage, MoreContentButton, WaitingPlugins, SavedPopup},


  data(){
    return {
      search: String(this.$route.params.search),
      plugin: String(this.$route.params.plugin),
      show: false,
      content: [],
      savedContent: [],
      savedIds: [],
      relKey: 0,
      waitingPlugins: null,
      searchVisibility: true,
      showLoading: true,
      errors: [],
      ic: new IntercraController(),
      sorting: "repeat",
      savedPressed: false,
      isSaveContent: false,
      showPopup: false,
    };
  },

  created() {
    let sort = this.getCookies("sorting");
    if(sort != null){
      this.sorting = sort;
    }


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

    EventBus.addEventListener('change-sorting', (event) => {
      this.ic.setSorting(event.data);
      location.reload();
    })

    EventBus.addEventListener('login-circle', (event) => {
      let sc = new SpotifyController();
      sc.login();
    })
    EventBus.addEventListener('show-saved-popup', (event) => {
      this.showPopup = true;
      EventBus.emit("data-sender-saved-popup", this.savedContent)
    })
    EventBus.addEventListener('close-saved-popup', (event) => {
      this.showPopup = false;
    })
    EventBus.addEventListener('save-result', (event) => {
      if(!this.savedPressed){
        this.savedPressed = true;
      }
      if(!this.savedIds.includes(event.data)){
        let index = event.data;
        let index2 = index + 1;
        let saved = this.content.slice(index,index2)
        saved[0].parentId = index;
        this.savedContent = this.savedContent.concat(saved);
        this.savedIds = this.savedIds.concat(index);
        this.isSaveContent = true;
      }
    })
    EventBus.addEventListener('save-remove', (event) => {
      let parentId = -1;
      this.isSaveContent = false;
      this.savedContent.forEach((element,index)=>{
        if(index == event.data){
          parentId = this.savedContent[index].parentId;
          this.savedContent.splice(index,1);
        }
      });
      this.savedIds.forEach((element,index)=>{
        if(element == parentId){
          this.savedIds.splice(index, 1);
        }
      });
    })
  },
  mounted() {
    //window.addEventListener("scroll", this.handleScroll);

    let sorting = this.getCookies("sorting");

    this.ic.startSearch(this.search, this.plugin, this.$cookies.get("token"), sorting);

    this.ic.changeShow();

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
        return this.$cookies.set(key, value, 2147483647);
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
    checkScreenSize(){
      if(window.innerWidth > 1440){
        return true;
      }else{
        return false;
      }
    },
    hasSaved(){
      if(this.savedContent.length > 0){
        return true;
      }
      return false;
    },
    showFromPopup: function (message){
      this.showPopup = message;
    },
  }
}
</script>