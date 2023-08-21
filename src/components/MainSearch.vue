<template>
  <div>
    <div class="background-black opacity-fade-in" ref="background">
      <PluginPopup :show="show" @show-popup="showFromPopup"/>
      <SocialMediaPopup :show="smShow" @show-popup="showFromPopup"/>
      <SpotifyLoginPopup :show="slShow" @sl-message="slMessage"/>
      <div class="fullscreen">
        <div class="relative center-horizontal">
          <div class="absolute">
            <div class="relative center-horizontal video-div" v-if="checkScreenSizeForVideo()">
              <video ref="video" class="absolute video-effect" src="../assets/intercra-video.mp4" type="video/mp4"/>
              <video ref="videoreverse" class="absolute video-effect" v-if="reverse" src="../assets/intercra-video-reverse.mp4" type="video/mp4"/>
            </div>
              <MainNav v-if="checkScreenSizeForVideo()"/>
          </div>
          <div class="absolute">
            <div class="scroll-down">
              <p class="center-horizontal white">Scroll down for the plugin list</p>
              <div class="center-horizontal">
                <img class="center-horizontal" src="../assets/arrow_down.png" width="30"/>
              </div>
            </div>
            <div class="center">
              <div class="search-box">
                  <div class="center-horizontal">
                      <!--<FeedbackButton/>
                      <FeedButton/>/!-->
                  </div>
                <div class="center-horizontal" style="margin-bottom: 10px">
                  <img src="../assets/intercra_anim_text.gif" class="logo-text center-horizontal" ref="logo">
                </div>
                <div class="center-horizontal">
                  <input
                      ref="input"
                      v-on:focus="inputFocus()"
                      v-on:blur="inputLostFocus()"
                      @keyup.enter="enterClicked()"
                      placeholder="Search here"
                      class="glow search-input center-horizontal search-input-color search-input-border-color"/>
                </div>
                <div class="center-horizontal">
                  <div>
                    <div style="height: 20px"/>
                      <UsageButton :onClick="enterClicked">
                          <p class="white more-content-button-text">Start Search</p>
                      </UsageButton>
                      <FeedButton/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="center-horizontal preset">
        <PresetView/>
      </div>
      <div class="center-horizontal">
          <div class="plugin-list block-display check-box-grid">
          <p v-if="isCookiesAllowed()"></p>
          <p v-else>You declined to collect Cookies. That's why changes to these plugins will not be saved.</p>
          <PluginCheckBox
              v-for="(pl, index) in pluginList"
              :title="pl.title"
              :check="pl.enable"
              :preset="pl.preset"
              @click="onCheckBoxClicked(index)">

          </PluginCheckBox>

        </div>
      </div>

        <div style="margin-top: 70px">
            <MainNav v-if="!checkScreenSizeForVideo()"/>
        </div>


    </div>
  </div>
</template>

<script>

import PluginPopup from "./views/PluginPopup.vue";
import {ViewCollection} from "./intercraSystemCode/classes/ViewCollection";
import {PluginController} from "./intercraSystemCode/controllers/PluginController";
import {IntercraController} from "./intercraSystemCode/controllers/IntercraController";
import {SpotifyController} from "./intercraSystemCode/controllers/SpotifyController";
import PluginCheckBox from "./views/PluginCheckBox.vue";
import ViewTemplatesPage from "./ViewTemplatesPage.vue";
import SpotifyLoginPopup from "./views/SpotifyLoginPopup.vue";
import PresetView from "./views/PresetView.vue";
import {PresetController} from "./intercraSystemCode/controllers/PresetController";
import EventBus from "./intercraSystemCode/classes/EventBusEvent";
import {GoogleController} from "./intercraSystemCode/controllers/GoogleController";
import MainNav from "./views/MainNav.vue";
import SocialMediaPopup from "./views/SocialMediaPopup.vue";
import FeedButton from "./views/FeedButton.vue";
import UsageButton from "./views/UsageButton.vue";
import FeedbackButton from "./views/FeedbackButton.vue";

export default {
  //npm run dev | npm run build
  name: "MainSearch",
  components: {
      FeedbackButton,
      UsageButton,
    FeedButton,
    SocialMediaPopup, MainNav, PresetView, PluginCheckBox, PluginPopup, ViewTemplatesPage, SpotifyLoginPopup},



    data() {
        return {
            show: false,
            pluginList: [],
            callback: "",
            slShow: false,
            smShow: false,
            gifPlay: true,
            gifStatus: {
                isPlaying: false,
                duration: 0,
                timerId: null
            },
            reverse: false,
            alreadyPlayed: false,
        }
    },

  created() {

      this.setCookies("noads", "true")



    document.title = "Intercra"

    this.$cookies.set("cookiesAllowed",  "true", 2147483647);
    //always allowed because cookies are necessary


    let pc = new PluginController();
    let allPlugins = pc.getPluginList();
    pc.getPresetValuesFromPlugin("jssnrfkjen")

    this.pluginList = [];

    for(let i = 0; i < allPlugins.length; i++){
      let active = "";
      if(this.getEnabledFromCookie(allPlugins[i].getId()) == null){
        if(allPlugins[i].getId() === "spotify_tracks" || allPlugins[i].getId() === "youtube_video") {
          active = "false";
        }else{
          active = "true";
        }
      }else{
        active = this.getEnabledFromCookie(allPlugins[i].getId());
      }



      this.pluginList.push({
        id: i,
        title: allPlugins[i].getPluginDisplayName(),
        pluginId: allPlugins[i].getId(),
        enable: active,
        preset: pc.getPresetValuesFromPlugin(allPlugins[i].getId())
      });
    }


    EventBus.addEventListener('change-plugins', (event) => {
      let ids = event.data;
      for(let i = 0; i < this.pluginList.length; i++){
        if(ids.includes(this.pluginList[i].pluginId)){
          this.pluginList[i].enable = "true";
          this.$cookies.set(this.pluginList[i].pluginId, "true", 2147483647)
        }else{
          this.pluginList[i].enable = "false";
          this.$cookies.set(this.pluginList[i].pluginId, "false", 2147483647)
        }
      }
    })

    EventBus.addEventListener('hide-social-media', (event) => {
      this.smShow = false;
    })

    EventBus.addEventListener('show-social-media', (event) => {
      this.smShow = true;
    })

    EventBus.addEventListener('open-feed', (event) => {
      this.openFeed()
    })

      EventBus.addEventListener('open-feedback', (event) => {
          //this.openFeedback()
      })

    EventBus.addEventListener('open-settings', (event) => {
      this.openSettings()
    })
  },

  mounted() {

    if(this.getCookies("cookiesAllowed") == null){
      this.show = true;
    }

    if(this.getCookies("spotifyLogin") == "true"){
      this.setCookies("spotifyLogin", false);
      this.$notify("successfully logged into spotify");
    }

    if(!this.checkPluginsInCookies()){
      this.setAllPluginsInCookies()
    }

  },


  updated() {
    if(this.reverse && !this.alreadyPlayed){
      this.alreadyPlayed = true;
      this.$refs.videoreverse.play();
      setTimeout(() => this.$refs.video.currentTime = 0, 500);

    }
  },

  methods: {

    showFromPopup: function (message){
      this.show = message;
    },

    slMessage: function (message){
      this.slShow = false;
      if(message === "yes"){
        this.startSearch();
      }else if(message === "always"){

      }else if(message === "no"){

      }
    },

    onCheckBoxClicked: function (index) {
      EventBus.emit("change-preset-button-name")

      if (true) {
        if (this.pluginList[index].enable === "true") {
          this.pluginList[index].enable = "false";
          this.$cookies.set(this.pluginList[index].pluginId, "false", 2147483647)

        } else {
          this.pluginList[index].enable = "true";
          this.$cookies.set(this.pluginList[index].pluginId, "true", 2147483647)
        }
      }
    },

    getCheckBoxIndexById(id){
      for(let i = 0; i < this.pluginList.length; i++){
        if(id === this.pluginList[i].pluginId){
          return i;
        }
      }
    },

    getEnabledFromCookie(id) {
      //let ic = new IntercraController();
      let status = "";
      if(this.getCookies(id) != null){
        status = this.getCookies(id);
      }else{
        status = null;
      }

      return status;
    },

    pluginIsEnabled(id){
      for(let i = 0; i < this.pluginList.length; i++){
        if(this.pluginList[i].id === id){
          return this.pluginList[i].enable;
        }
      }
    },

    enterClicked(){


      this.startSearch();
    },

    startSearch(){
      let searchText = this.$refs.input.value;
      if(searchText === ""){
          this.$notify("There is nothing in the search field");
      }else{
          this.$refs.background.className = this.$refs.background.className.replace("opacity-fade-in", "opacity-fade-out")

          let route = this.$router.resolve({path: '/search/' + searchText});
          setTimeout(() => window.open(route.href, '_self'), 500);
      }

    },

    checkSearch(response){
      if(response == null || response === "error") {
        this.slShow = true;
      }else{
        this.startSearch()
      }
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

    inputFocus(){
      this.alreadyPlayed = false;
      this.$refs.video.play();
      setTimeout(() => this.$refs.videoreverse.currentTime = 0, 500);
      this.reverse = false;
      this.$refs.input.className = this.$refs.input.className.replace("glow-after", "glow");
    },

    inputLostFocus(){
      this.reverse = true;
      this.$refs.input.className = this.$refs.input.className.replace("glow", "glow-after");
    },

    checkScreenSizeForVideo(){
      if(window.innerWidth > 1000){
        return true;
      }else{
        return false;
      }
    },

    setAllPluginsInCookies(){
      for(let i = 0; i < this.pluginList.length; i++){
        this.setCookies(this.pluginList[i].pluginId, this.pluginList[i].enable)
      }
    },

    checkPluginsInCookies(){
      for(let i = 0; i < this.pluginList.length; i++){
        let check = this.getCookies(this.pluginList[i].pluginId)
        if(check == null){
          return false
        }
      }
      return true
    },
    openFeed(){
      this.$refs.background.className = this.$refs.background.className.replace("opacity-fade-in", "opacity-fade-out")

      let route = this.$router.resolve({path: '/feed'});
      setTimeout(() => window.open(route.href, '_self'), 500);
    },

      openFeedback(){
          this.$refs.background.className = this.$refs.background.className.replace("opacity-fade-in", "opacity-fade-out")

          let route = this.$router.resolve({path: '/feedback'});
          setTimeout(() => window.open(route.href, '_self'), 500);
      },

    openSettings(){
      this.$refs.background.className = this.$refs.background.className.replace("opacity-fade-in", "opacity-fade-out")

      let route = this.$router.resolve({path: '/settings'});
      setTimeout(() => window.open(route.href, '_self'), 500);
    }


  }
}
</script>