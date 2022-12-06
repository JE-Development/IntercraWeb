
<template>
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






</template>

<script>
import PluginPopup from "./PluginPopup.vue";
import PluginButton from "./PluginButton.vue";
import {ViewCollection} from "./intercraSystemCode/classes/ViewCollection";
export default {
  //npm run dev | npm run build
  name: "MainSearch",
  components: {PluginButton, PluginPopup},
  methods: {
    enterClicked(){

      let searchText = document.getElementById("main-input-search").value;

      let route = this.$router.resolve({path: '/search/' + "nona_web---amazon---bandcamp_album" + "/" + searchText});
      window.open(route.href, '_self');

    },
    onClickPopupButton: function (){
      this.$emit("show-popup", this.showButton);
    },
    onClickButton: function (){
      console.log("click")

      for(let i = 0; i < 5; i++){
        let doc =  document.getElementById("check-box-list");

        let view = document.createElement("div");

        let vc = new ViewCollection();
        let cb = vc.getCheckBoxView();

        cb = String(cb).replace(";;;plugin-name;;;", "name " + i);

        if (doc != null) {
          view.innerHTML = cb;
          doc.appendChild(view);
          console.log("html");
          //return "html"
        }else{
          console.log("doc null");
        }
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
