

<template>
  <div>
    <SavedPopup :show="showPopup" @show-popup="showFromPopup" :saved-content="savedContent"/>
    <div class="center-horizontal opacity-fade-in">
      <div>
        <div class="center-horizontal">
          <a href="https://intercra.com">
            <img src="../assets/intercra-connected-text.png" class="result-image center-horizontal"/>
          </a>
        </div>

        <input
            @keyup.enter="enterClicked()"
            id="result-input-search"
            placeholder="Search here"
            :value="search"
            class="search-input center-horizontal search-input-color search-input-border-color">
      </div>

    </div>

    <h3 class="center-horizontal error-color" v-if="noPlugin">No plugin is enabled</h3>

    <div v-if="errors.length > 0">
      <h3 class="center-horizontal error-color">Error in:</h3>
      <div v-for="(err) in errors" class="center-horizontal">
        <h4 class="error-color">{{err}}</h4>
      </div>
    </div>

    <SortingView :enabled="sorting"/>

    <audio ref="audioPlayer" :src="audioUrl"></audio>

    <div class="center-horizontal sticky top-position" v-if="!checkScreenSize() && hasSaved()">
      <SavedContentButton :show="true"/>
    </div>

    <div class="center-horizontal">
      <div class="main-results center-horizontal">
        <div>

          <div>

              <div id="adsterra-banner"></div>

          </div>

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
                             :author="dat.author"
                             :scaleIndex="dat.scaleIndex"
                             :preview="dat.preview"
                             :error="dat.error"
                             :sizes="dat.sizes"
                             :vectorDownloadUrl="dat.vectorDownloadUrl"
                             :downloads="dat.downloads"
                             :categories="dat.categories"
                             :isResult="true"
          />
        </div>
      </div>

      <div style="width: 30px" v-if="checkScreenSize()"></div>
      <div class="view-border-null" ref="saved">
        <div class="sticky" v-if="savedContent.length != 0 && checkScreenSize()" style="width: 100%">
          <div class="outer-scroll">

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
                               :author="dat.author"
                               :scaleIndex="dat.scaleIndex"
                               :preview="dat.preview"
                               :error="dat.error"
                               :sizes="dat.sizes"
                               :vectorDownloadUrl="dat.vectorDownloadUrl"
                               :downloads="dat.downloads"
                               :categories="dat.categories"
                               :isResult="true"
            />
          </div>
        </div>
      </div>

    </div>

    <div id="searchRoot" v-if="waitingPlugins.length > 0">
      <div id="loading-result" class="center-horizontal">
        <img src="../assets/loading.gif" class="loading-image"/>
      </div>
    </div>

    <div class="center-horizontal waiting-margin headline-color" v-if="waitingPlugins.length > 0">
      <h2>Waiting for:</h2>
    </div>

    <WaitingPlugins v-for="(dat) in waitingPlugins" :data="dat"/>

    <div id="more-content-button-root" class="center-horizontal">
      <MoreContentButton :show="show" :search="search" :plugin="plugins" :ic="ic"/>
    </div>
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
import {GoogleController} from "./intercraSystemCode/controllers/GoogleController";
import {PluginController} from "./intercraSystemCode/controllers/PluginController";

export default {
  name: "SearchResultPage",
  components: {SavedContentButton, SortingView, ViewTemplatesPage, MoreContentButton, WaitingPlugins, SavedPopup},



  data(){
    return {
      search: String(this.$route.params.search),
      plugins: [],
      show: false,
      content: [],
      savedContent: [],
      savedIds: [],
      relKey: 0,
      waitingPlugins: [],
      searchVisibility: true,
      showLoading: true,
      errors: [],
      pc: new PluginController(),
      ic: new IntercraController(this.pc),
      sorting: "repeat",
      savedPressed: false,
      isSaveContent: false,
      showPopup: false,
      noPlugin: false,
      beforeSaved: false,
      audioUrl: "",
      audioIndex: -1,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isDragging: false,
      progress: 0,
      newgroundsAudioUrl: [],
      adsterra: null,
     };
  },

  created() {
    this.ic = new IntercraController(this.pc)

      this.adsterra = {
          slots: [
              {
                  key : 'a07474aa74bd2f07f728638a5395d920',
                  format : 'iframe',
                  height : 600,
                  width : 160,
                  params : {}
              },
          ],
          usePrebid: false,
          useAPS: false,
          customEvents: {
              blueBackground: {
                  eventMessagePrefix: 'BlueBackground:',
              },
          },
      }

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
      console.log("show: " + this.show)
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

    EventBus.addEventListener('start-more-search', (event) => {
      this.ic.startMoreSearch(this.search, this.plugin, this.$cookies.get("token"), this.$cookies.get("token-youtube"));
      this.ic.changeShow();
    })

    EventBus.addEventListener('change-sorting', (event) => {
      this.ic.setSorting(event.data);
      location.reload();
    })
    EventBus.addEventListener('youtube-login-circle', (event) => {
      let gc = new GoogleController();
      gc.login();
    })
    EventBus.addEventListener('show-saved-popup', (event) => {
      this.showPopup = true;
      EventBus.emit("data-sender-saved-popup", this.savedContent)
    })
    EventBus.addEventListener('close-saved-popup', (event) => {
      this.showPopup = false;
    })
    EventBus.addEventListener('save-result', (event) => {
      if(this.checkScreenSize()) {
        this.$refs.saved.className = this.$refs.saved.className.replace("view-border-decrease", "view-border-increase")
        this.$refs.saved.className = this.$refs.saved.className.replace("view-border-null", "view-border-increase")
        this.addSaved(event);
      }else{
        this.addSaved(event)
      }

    })
    EventBus.addEventListener('save-remove', (event) => {
      if(this.checkScreenSize()) {
        if (this.hasOneSaved()) {
          this.$refs.saved.className = this.$refs.saved.className.replace("view-border-increase", "view-border-decrease")
          setTimeout(() => this.removeSaved(event), 500);
        } else {
          this.removeSaved(event);
        }
      }else{
        this.removeSaved(event)
      }
    })

    EventBus.addEventListener('audio-play', (event) => {
      let split = event.data.split(";;;");
      let url = split[0];
      let index = [split[1]];

      this.isPlaying = true;

      if(url === this.audioUrl){
        this.playAudio()
      }else{
        if(this.audioIndex != -1){
          EventBus.emit("audio-reset-" + this.audioIndex)
        }
        this.audioIndex = index;
        this.audioUrl = url;
        const playAudio = (audio) => {
          audio.addEventListener('loadeddata', () => {
            EventBus.emit("audio-max", audio.duration)
            audio.play();
          });
          audio.load();
        }
        playAudio(this.$refs.audioPlayer)
      }
    })

    EventBus.addEventListener('audio-pause', (event) => {
      this.pauseAudio()
      this.isPlaying = false;
    })

    EventBus.addEventListener('audio-play-dragged', (event) => {
      console.log(this.$refs.audioPlayer.currentTime)
      console.log(event.data)
      console.log(event.data/100)
      this.$refs.audioPlayer.currentTime = event.data/100
      console.log(this.$refs.audioPlayer.currentTime)
      this.playAudio()
    })

    EventBus.addEventListener('newgrounds-audio-url', (event) => {
      this.newgroundsAudioUrl.push(event.data)
    })

  },

  beforeDestroy() {
    this.$refs.audioPlayer.removeEventListener('timeupdate', this.updateProgress);
  },

  mounted() {



      this.$refs.audioPlayer.addEventListener('timeupdate', this.updateProgress);

    let sorting = this.getCookies("sorting");

    this.getAllActivePlugins()

      if(this.search === "---test-result"){
          this.plugins = this.pc.getPluginsByPresetValue("Shopping")
          this.search = "test";

          for(let i = 0; i < 50; i++){
              this.content.push({
                  choosenView: "shoppingView",
                  url: "https://intercra.com",
                  headline: "This is a headline",
                  pluginName: "Intercra Plugin",
                  price: "free",
                  image: "https://intercra.com/assets/intercra-connected-text.331d4b22.png",
                  author: "There is no author"
              })
          }
      }else{
          if(this.plugins.length == 0) {
              this.showLoading = false;
              this.noPlugin = true;
          }else{
              this.showLoading = true;
              this.noPlugin = false;
              this.ic.startSearch(this.search, this.plugins, this.$cookies.get("token"), sorting, this.$cookies.get("token-youtube"), this.pc);
          }
          this.ic.changeShow();
      }

    document.title = "Search - " + this.search

  },

  methods: {

    addSaved(event){
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
    },

    removeSaved(event){
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
    },

    updateSearch: function (){
      this.show = true;
    },

    enterClicked(){

      let searchText = document.getElementById("result-input-search").value;

      let route = this.$router.resolve({path: '/search/' + searchText});
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
    hasOneSaved(){
      if(this.savedContent.length == 1){
        return true;
      }
      return false;
    },
    showFromPopup: function (message){
      this.showPopup = message;
    },
    playAudio(){
      this.$refs.audioPlayer.play();
    },
    pauseAudio(){
      this.$refs.audioPlayer.pause();
    },
    updateProgress() {
      this.progress = this.$refs.audioPlayer.currentTime
      EventBus.emit("audio-pos", this.progress)
    },

    getAllActivePlugins(){
      let pc = new PluginController();
      let all = pc.getAllPluginsAsId();
      for(let i = 0; i < all.length; i++){
        let status = this.getCookies(all[i])
        if(status === "true"){
          this.plugins.push(all[i])
        }
      }
      console.log(this.plugins)
    }

  }
}
</script>