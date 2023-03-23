<template>
  <div>
    <div class="background-black">
      <PluginPopup :show="show" @show-popup="showFromPopup"/>
      <SocialMediaPopup :show="smShow" @show-popup="showFromPopup"/>
      <SpotifyLoginPopup :show="slShow" @sl-message="slMessage"/>
      <div class="fullscreen">
        <div class="relative center-horizontal">
          <div class="absolute">
            <div class="relative center-horizontal video-div">

              <video ref="video" class="absolute video-effect" src="../assets/intercra-video.mp4" type="video/mp4"/>
              <video ref="videoreverse" class="absolute video-effect" v-if="reverse" src="../assets/intercra-video-reverse.mp4" type="video/mp4"/>

            </div>
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
                <div class="center-horizontal" style="margin-bottom: 10px">
                  <img src="../assets/intercra_anim_text.gif" class="logo-text center-horizontal">
                </div>
                <input
                    ref="input"
                    v-on:focus="inputFocus()"
                    v-on:blur="inputLostFocus()"
                    @keyup.enter="enterClicked()"
                    id="main-input-search"
                    placeholder="Search here"
                    class="glow search-input center-horizontal search-input-color search-input-border-color">
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="center-horizontal preset">
        <PresetView/>
      </div>
      <div class="center-horizontal">
        <div id="plugin-list" class="block-display">
          <p v-if="isCookiesAllowed()"></p>
          <p v-else>You declined to collect Cookies. That's why changes to these plugins will not be saved.</p>
          <PluginCheckBox
              v-for="(pl, index) in pluginList"
              :title="pl.title"
              :check="pl.enable"
              @click="onCheckBoxClicked(index)">

          </PluginCheckBox>

        </div>
      </div>


      <MainNav/>
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
import myGif from '../assets/intercra-gif.gif';
import firstGifFrame from '../assets/intercra-gif-first.png';
import lastGifFrame from '../assets/intercra-gif-last.png';

export default {
  //npm run dev | npm run build
  name: "MainSearch",
  components: {
    SocialMediaPopup, MainNav, PresetView, PluginCheckBox, PluginPopup, ViewTemplatesPage, SpotifyLoginPopup},

  created() {

    this.$cookies.set("cookiesAllowed",  "true", 2147483647);
    //always allowed because cookies are necessary


    let pc = new PluginController();
    let allPlugins = pc.getPluginList();

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
  },

  mounted() {

    if(this.getCookies("cookiesAllowed") == null){
      this.show = true;
    }

    if(this.getCookies("spotifyLogin") == "true"){
      this.setCookies("spotifyLogin", false);
      this.$notify("successfully logged into spotify");
    }

    let pc = new PluginController();
    pc.getPresetSettings("amazon");
    let pre = new PresetController();
    pre.getEnumValueByKey("SHOPPING")

  },
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
      placeholder: firstGifFrame,
      alreadyPlayed: false,
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

      if (this.getCookies("cookiesAllowed") == "true") {
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
      /*if(this.pluginIsEnabled("spotify_tracks")) {

        let sc = new SpotifyController();
        sc.httpLibraryRequest(this.$cookies.get("token"), "test", "track", 10, 0, false).then(
            r => this.checkSearch(r)
        );
      }else{
        this.startSearch();
      }*/

      //let gc = new GoogleController();
      //gc.login();

      this.startSearch();
    },

    startSearch(){
      let searchText = document.getElementById("main-input-search").value;

      let activePlugins = "null";

      for(let i = 0; i < this.pluginList.length; i++){
        if(this.pluginList[i].enable === "true"){
          if(activePlugins == "null"){
            activePlugins = this.pluginList[i].pluginId;
          }else{
            activePlugins = activePlugins + "---" + this.pluginList[i].pluginId;
          }
        }
      }

      let route = this.$router.resolve({path: '/search/' + activePlugins + "/" + searchText});
      window.open(route.href, '_self');
    },

    checkSearch(response){
      console.log("check this: " + response)
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


  }
}
</script>