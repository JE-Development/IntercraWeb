<template>
  <PluginPopup :show="show" @show-popup="showFromPopup"/>
  <SpotifyLoginPopup :show="slShow" @sl-message="slMessage"/>
  <div class="fullscreen">
    <div class="scroll-down">
      <p class="center-horizontal">Scroll down for the plugin list</p>
      <div class="center-horizontal">
        <img class="center-horizontal" src="../assets/arrow_down.png" width="30"/>
      </div>
    </div>
    <div class="center">
      <div class="search-box">
        <div class="center-horizontal">
          <img src="../assets/intercra_text_anim.gif" class="logo-text center-horizontal">
        </div>
        <input
            @keyup.enter="enterClicked()"
            id="main-input-search"
            placeholder="Search here"
            class="search-input center-horizontal search-input-color search-input-border-color">
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


</template>

<script>

import PluginPopup from "./views/PluginPopup.vue";
import PluginButton from "./views/PluginButton.vue";
import {ViewCollection} from "./intercraSystemCode/classes/ViewCollection";
import {PluginController} from "./intercraSystemCode/controllers/PluginController";
import {IntercraController} from "./intercraSystemCode/controllers/IntercraController";
import {SpotifyController} from "./intercraSystemCode/controllers/SpotifyController";
import PluginCheckBox from "./views/PluginCheckBox.vue";
import ViewTemplatesPage from "./ViewTemplatesPage.vue";
import SpotifyLoginPopup from "./views/SpotifyLoginPopup.vue";
import PresetView from "./views/PresetView.vue";
import {PresetController} from "./intercraSystemCode/controllers/PresetController";

export default {
  //npm run dev | npm run build
  name: "MainSearch",
  components: {PresetView, PluginCheckBox, PluginButton, PluginPopup, ViewTemplatesPage, SpotifyLoginPopup},

  created() {


    let pc = new PluginController();
    let allPlugins = pc.getPluginList();

    this.pluginList = [];

    for(let i = 0; i < allPlugins.length; i++){
      let active = "";
      if(this.getEnabledFromCookie(allPlugins[i].getId()) == null){
        if(allPlugins[i].getId() === "spotify_tracks") {
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
  },

  mounted() {
    if(this.getCookies("cookiesAllowed") == null){
      this.show = true;
    }

    let pc = new PluginController();
    pc.getPresetSettings("amazon");

  },
  data() {
    return {
      show: false,
      pluginList: [],
      callback: "",
      slShow: false,
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
      //let ic = new IntercraController();

      if (this.getCookies("cookiesAllowed") == "true") {
        if (this.pluginList[index].enable === "true") {
          this.pluginList[index].enable = "false";
          this.$cookies.set(this.pluginList[index].pluginId, "false")

        } else {
          this.pluginList[index].enable = "true";
          this.$cookies.set(this.pluginList[index].pluginId, "true")
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
    }


  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
}

.modal-container {
  display: block;
  width: 600px;
  margin: 0px auto;
  padding: 5px 5px;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

@media (max-width: 420px) {

  .modal-container{
    width: 370px;
  }

}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {

}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
