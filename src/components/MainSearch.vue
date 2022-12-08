
<template>
  <PluginPopup :show="show" @show-popup="showFromPopup"/>
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
          <img src="../assets/intercra-text.png" class="logo-text center-horizontal">
        </div>
        <input
            @keyup.enter="enterClicked()"
            id="main-input-search"
            placeholder="Search here"
            :value="text"
            class="search-input center-horizontal search-input-color search-input-border-color"
            @input="event => text = event.target.value">
        <p>This page is in development.</p>
        <!--<h1><font-awesome-icon icon="fa-sharp fa-solid fa-check" /></h1>/!-->
      </div>
    </div>
  </div>
  <div class="center-horizontal">
    <div id="plugin-list" class="block-display">

    </div>
  </div>


</template>

<script>

import PluginPopup from "./PluginPopup.vue";
import PluginButton from "./PluginButton.vue";
import {ViewCollection} from "./intercraSystemCode/classes/ViewCollection";
import {PluginController} from "./intercraSystemCode/controllers/PluginController";
import {IntercraController} from "./intercraSystemCode/controllers/IntercraController";
export default {
  //npm run dev | npm run build
  name: "MainSearch",
  components: {PluginButton, PluginPopup},
  mounted() {
    let ic = new IntercraController();
    //ic.setCookie("jason", " he is a developer");
    if(ic.getCookie("cookiesAllowed") == "null"){
      this.show = true;
    }
    console.log("cookies: " + ic.getCookie("cookiesAllowed"));


    let pc = new PluginController();
    let plugins = pc.getPlugins();
    for(let i = 0; i < plugins.length; i++){
      let root =  document.getElementById("plugin-list");
      let view = document.createElement("div");

      let vc = new ViewCollection();
      let cb = vc.getCheckBoxView();
      //let cb = document.getElementsByClassName("plugin-view")[0];
      //cb.setAttribute("id", "plugin-box-" + plugins[i].getId());

      cb = String(cb).replace(";;;plugin-name;;;", plugins[i].getPluginDisplayName());
      cb = cb.replace(";;;id;;;", plugins[i].getId);

      if(root != null){
        view.innerHTML = cb;
        root.appendChild(view);
      }else{
        console.log("root is null")
      }
    }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    showFromPopup: function (message){
      this.show = message;
    },

    onCheckBoxClicked: function (event){
      console.log("target: " + event.target);
    },

    enterClicked(){

      let ic = new IntercraController();
      //let activePlugins = ic.getCheckedPlugins(this);
      //console.log(activePlugins);

      let searchText = document.getElementById("main-input-search").value;

      let route = this.$router.resolve({path: '/search/' + "" + "/" + searchText});
      //window.open(route.href, '_self');

    },
    onClickPopupButton: function (){
      this.$emit("show-popup", this.showButton);
    },


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
