<template>
    <div class="center-horizontal">
      <div>

        <div class="center-horizontal">
          <div>
            <div v-if="this.notSpotifyCompatible">
              <h4 class="error-color">
                The plugin "Spotify Tracks" was disabled. To use it disable all other plugins.
              </h4>
            </div>
            <div v-if="waitingPlugins != null && waitingPlugins.length > 0">
              <div id="searchRoot">
                <div id="loading-result" class="center-horizontal">
                  <img src="../../assets/loading.gif" class="loading-image"/>
                </div>
              </div>

              <div class="center-horizontal waiting-margin headline-color">
                <h2>Waiting for:</h2>
              </div>

              <WaitingPlugins v-for="(dat) in waitingPlugins" :data="dat"/>
            </div>
          </div>
        </div>
        <div>
          <SavedPopup :show="showSavedPopup" @show-popup="showFromPopup" :saved-content="savedFeed"/>


          <div v-if="errors.length > 0">
            <h3 class="center-horizontal error-color">Error in:</h3>
            <div v-for="(err) in errors" class="center-horizontal">
              <h4 class="error-color">{{err}}</h4>
            </div>
          </div>

          <audio ref="audioPlayer" :src="audioUrl"></audio>

          <div class="feed-page">
            <div class="feed-grid center-horizontal">
              <ViewTemplatesPage v-for="(dat, id) in content"
                                 class="feed-item"
                                 :index="id"
                                 :savedContent="false"
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
                                 :isResult="false"
              />




            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>


import {PluginController} from "../intercraSystemCode/controllers/PluginController";
import ArticleView from "../layouts/ArticleView.vue";
import SavedPopup from "../views/SavedPopup.vue";
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import ViewTemplatesPage from "../ViewTemplatesPage.vue";
import {IntercraController} from "../intercraSystemCode/controllers/IntercraController";
import WaitingPlugins from "../views/WaitingPlugins.vue";

export default {
  name: "FeedPage",
    components: {WaitingPlugins, ViewTemplatesPage, SavedPopup, ArticleView},

  created() {
    this.getAllActivePlugins()
    this.checkSpotifyActive()

      /*for(let i = 0; i < 20; i++){
          this.feedContent.push("" + i)
      }*/

      EventBus.addEventListener('feed-data-sender', (event) => {
          if(true){
            if(this.content.length <= 0){
              this.content = event.data;
            }else{
              if(!this.checkDuplicate(event.data)){
                this.content = this.content.concat(event.data);
              }

            }
          }
      })

    EventBus.addEventListener('feed-error-sender', (event) => {
      this.errors = event.data;
      this.waitingPlugins = false;
      if(this.content.length > 0){
        this.show = true;
      }
    })

    EventBus.addEventListener('feed-not-finished', (event) => {
      this.waitingPlugins = event.data;
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
      this.$refs.audioPlayer.currentTime = event.data/100
      console.log(this.$refs.audioPlayer.currentTime)
      this.playAudio()
    })
  },

  beforeDestroy() {
    this.$refs.audioPlayer.removeEventListener('timeupdate', this.updateProgress);
  },

  mounted() {

    if(this.activePlugins.length === 0){
      this.setAllPluginsInCookies()
    }

    this.$refs.audioPlayer.addEventListener('timeupdate', this.updateProgress);

    this.ic.startFeedSearch(this.activePlugins)

  },

  data(){
    return{
      activePlugins: [],
        savedFeed: [],
        showSavedPopup: false,
        content: [],
        ic: new IntercraController(),
      waitingPlugins: null,
      errors: [],
      audioUrl: "",
      audioIndex: -1,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isDragging: false,
      progress: 0,
      notSpotifyCompatible: false,

    }
  },

  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(true){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
    getAllActivePlugins(){
      let pc = new PluginController();
      let all = pc.getAllPluginsAsId();
      for(let i = 0; i < all.length; i++){
        let status = this.getCookies(all[i])
        if(status === "true"){
          this.activePlugins.push(all[i])
        }
      }
    },
    checkSpotifyActive(){
      if(this.activePlugins.includes("spotify_tracks") && this.activePlugins.length >= 2){
        this.notSpotifyCompatible = true
        const index = this.activePlugins.indexOf("spotify_tracks");
        if (index !== -1) {
          this.activePlugins.splice(index, 1);
        }
      }else {
        this.notSpotifyCompatible = false
      }
    },
      showFromPopup: function (message){
          this.showPopup = message;
      },

    checkDuplicate(dat){
      let data = dat[0]
      for(let i = 0; i < this.content.length; i++){
        let con = this.content[i]
        if(con.url === data.url){
          return true
        }
      }
      return false
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
    setAllPluginsInCookies(){
      let pc = new PluginController()
      let plugins = pc.getAllPluginsAsId()
      for(let i = 0; i < plugins.length; i++){
        if(plugins[i] === "spotify_tracks" || plugins[i] === "youtube_video"){
          this.setCookies(plugins[i], false)
        }else{
          this.setCookies(plugins[i], true)
          this.activePlugins.push(plugins[i])
        }
      }
    },
  },

}
</script>

<style scoped>

</style>