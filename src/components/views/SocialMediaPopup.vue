

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask-saved">
      <div class="modal-wrapper-saved">
        <div class="modal-container-saved search-box popup-background popup-width" style="background: #171717">
          <div style="justify-content: center;">
            <div class="center-horizontal" style="margin-top: 5px">
              <div>
                <div class="center-horizontal">
                  <button class="plugin-menu plugin-close center-horizontal" @click="onClose">
                    <p id="plugin-menu-text">Close</p>
                  </button>
                </div>

                <div class="social-media-popup-list center-horizontal popup-width">
                  <div>
                    <a href="https://twitter.com/je_development" class="pointer social-media-item popup-width center">Twitter</a>
                    <a href="https://www.instagram.com/je.creator/" class="pointer social-media-item popup-width center">Instagram</a>
                    <a href="https://www.youtube.com/channel/UCiCMvTtMFD4A9UJ5CwJAhOw" class="pointer social-media-item popup-width center">YouTube</a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>


<script>
import PluginCheckBox from "./PluginCheckBox.vue";
import {ViewCollection} from "../intercraSystemCode/classes/ViewCollection";
import {IntercraController} from "../intercraSystemCode/controllers/IntercraController";
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import ViewTemplatesPage from "../ViewTemplatesPage.vue";
export default {
  name: "SocialMediaPopup",
  components: {ViewTemplatesPage, PluginCheckBox},

  props: {
    show: Boolean,
  },
  data(){
    return{
      savedContent: [],
    }
  },


  created() {

  },

  methods: {
    onClose(){
      EventBus.emit("hide-social-media")
    }
  },

}
</script>

<style>
.modal-mask-saved {
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

.modal-wrapper-saved {
  display: table-cell;
}

.modal-container-saved {
  display: block;
  margin: 0px auto;
  padding: 5px 5px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.popup-width{
  width: 500px;
}

@media (max-width: 740px) {


  .popup-width{
    width: 90vw;
  }

}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}


.modal-enter-from .modal-container-saved,
.modal-leave-to .modal-container-saved {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>