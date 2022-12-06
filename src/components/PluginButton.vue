
<template id="parent-popup">
  <div class="button-layout">
      <button class="plugin-menu" @click="onClickPluginButton">
        <img width="25%" src="../assets/three-line.png" class="plugin-menu-image"/>
        <p id="plugin-menu-text">Open Plugin List</p>
      </button>
  </div>
  <div id="parent-popup-lol">

  </div>
  <!--<PluginPopup :show="show" @show-popup="showFromPopup"/>/!-->
</template>

<script>

import PluginPopup from "./PluginPopup.vue";
import {ViewCollection} from "./intercraSystemCode/classes/ViewCollection";
import PluginCheckBox from "./PluginCheckBox.vue";

export default {
  //npm run dev | npm run build
  name: "PluginButton",
  data() {
    return {
      show: false,
    }
  },
  components: {
    PluginPopup
  },
  methods: {
    onClickPluginButton: function (){
      this.show=true;

      let parent = document.getElementById("parent-popup");
      parent.appendChild(e);
    },
    showFromPopup: function (message){
      this.show = message;
    }
  }
}

</script>

<style>

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