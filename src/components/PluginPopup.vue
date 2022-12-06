<script>
import PluginCheckBox from "./PluginCheckBox.vue";
import {ViewCollection} from "./intercraSystemCode/classes/ViewCollection";
import {IntercraController} from "./intercraSystemCode/controllers/IntercraController";
export default {
  name: "PluginPopup",
  components: {PluginCheckBox},
  props: {
    show: Boolean,
    content: function () {

    }
  },
  data(){
    return{
      showButton: false,
    }
  },
  methods: {
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
  },
  mounted() {
    this.onClickPopupButton();
    //this.onClickButton();
  },


  created() {

  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container search-box">
          <div style="justify-content: center">
            <div class="plugin-view">
              <button class="plugin-menu plugin-close center-horizontal" @click="onClickPopupButton">
                <img width="25%" src="../assets/cross_smaller.png" class="plugin-menu-image"/>
                <p id="plugin-menu-text">Close Plugin List</p>
              </button>
            </div>
            <button class="plugin-menu plugin-close center-horizontal" @click="onClickButton"/>
            <div id="check-box-list">
              <div class="plugin-view">
                <input type="checkbox" class="check-box" id="plug1" name="p1" value="PluginName">
                <label for="plug1" class="check-box-label">This is a long website name</label><br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

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