<template>
    <div class="center-horizontal">
      <div>
        <div class="center-horizontal">
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
        <div>
          <SavedPopup :show="showSavedPopup" @show-popup="showFromPopup" :saved-content="savedFeed"/>


          <div v-if="errors.length > 0">
            <h3 class="center-horizontal error-color">Error in:</h3>
            <div v-for="(err) in errors" class="center-horizontal">
              <h4 class="error-color">{{err}}</h4>
            </div>
          </div>

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

      /*for(let i = 0; i < 20; i++){
          this.feedContent.push("" + i)
      }*/

      EventBus.addEventListener('feed-data-sender', (event) => {
          if(this.content.length <= 0){
              this.content = event.data;
          }else{
              this.content = this.content.concat(event.data);
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
  },

  mounted() {
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

    }
  },

  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(this.isCookiesAllowed()){
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
      showFromPopup: function (message){
          this.showPopup = message;
      },
  },

}
</script>

<style scoped>

</style>