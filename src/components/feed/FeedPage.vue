<template>
    <SavedPopup :show="showSavedPopup" @show-popup="showFromPopup" :saved-content="savedFeed"/>

  <div class="feed-page">
      <div class="feed-grid center-horizontal">
          <ArticleView
                  v-for="(dat, id) in feedContent"
                  class="feed-item"
                  :index="0"
                  :savedContent="false"
                  :url="''"
                  :headline="'headline'"
                  :pluginName="'Internal'"
                  :image="'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png'"
                  :date="'date'"
                  :platform="'platform'"
                  :author="'author'"
          />




      </div>
  </div>

</template>

<script>


import {PluginController} from "../intercraSystemCode/controllers/PluginController";
import ArticleView from "../layouts/ArticleView.vue";
import SavedPopup from "../views/SavedPopup.vue";

export default {
  name: "FeedPage",
    components: {SavedPopup, ArticleView},

  created() {
    this.getAllActivePlugins()

      for(let i = 0; i < 20; i++){
          this.feedContent.push("" + i)
      }
  },

  mounted() {


  },

  data(){
    return{
      activePlugins: [],
        feedContent: [],
        savedFeed: [],
        showSavedPopup: false,
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