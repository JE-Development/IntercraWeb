<script>
import PluginCheckBox from "./PluginCheckBox.vue";
import {ViewCollection} from "../intercraSystemCode/classes/ViewCollection";
import {IntercraController} from "../intercraSystemCode/controllers/IntercraController";
export default {
  name: "SpotifyLoginPopup",
  components: {PluginCheckBox},
  props: {
    show: Boolean,
  },
  data(){
    return{
      showButton: false,
    }
  },
  methods: {
    onAccept: function (){
      this.$emit("sl-message", "yes");
    },
    onAlways: function (){
      this.$emit("sl-message", "always");
      this.$cookies.set("always-login",  "true");
    },
    onDecline: function (){
      this.$emit("sl-message", "no");
    },

    onCheckBoxClick(event){

    }

  },
  mounted() {
  },


  created() {

  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container search-box popup-background">
          <div style="justify-content: center">
            <div class="center-horizontal text-black" style="margin-top: 20px">
              <p>
                You are not logged in to Spotify. Would you like to log in?
              </p>
            </div>

            <div class="plugin-view center-horizontal">

            </div>
            <div class="center-horizontal" style="margin-top: 20px">
              <button class="plugin-menu plugin-close center-horizontal" @click="onAccept">
                <p id="plugin-menu-text">Yes</p>
              </button>

              <div style="width: 50px"></div>

              <button class="plugin-menu plugin-close center-horizontal" @click="onAlways">
                <p id="plugin-menu-text">Always Yes</p>
              </button>

              <div style="width: 50px"></div>

              <button class="plugin-menu plugin-close center-horizontal" @click="onDecline">
                <p id="plugin-menu-text">No</p>
              </button>
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