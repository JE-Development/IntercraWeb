

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask-saved">
      <div class="modal-wrapper-saved">
        <div class="modal-container-saved search-box popup-background">
          <div style="justify-content: center">
            <div class="center-horizontal text-black" style="margin-top: 20px">
              <div>
                <div class="center-horizontal">
                  <button class="plugin-menu plugin-close center-horizontal" @click="onClose">
                    <p id="plugin-menu-text">Close</p>
                  </button>
                </div>

                <div ref="header" class="outer-scroll">

                  <div>
                    <img
                        class="generated-image-popup-width center-horizontal"
                        v-for="(dat) in images"
                        :src="dat"/>
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
import {FirebaseController} from "../intercraSystemCode/controllers/FirebaseController";
export default {
  name: "GeneratedImagesPopup",
  components: {ViewTemplatesPage, PluginCheckBox},

  props: {
    show: Boolean,
    id: String,
  },
  data(){
    return{
      images: []
    }
  },


  created() {

  },

  mounted() {
    this.startRequest()
  },

  methods: {
    onClose(){
      this.$emit('close');
    },

    startRequest(){
      this.serverError = false
      let fc = new FirebaseController()
      fc.getImages().then((data) => {
        let keys = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            keys.push(key);
          }
        }

        for(let i = 0; i < keys.length; i++){
          if(data[keys[i]].requestid === this.id){
            this.images.push("https://raw.githubusercontent.com/JE-Development/ImageStorage/main/ai/" + keys[i] + ".png")
          }
        }
      })
    },
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
  width: 550px;
  margin: 0px auto;
  padding: 5px 5px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

@media (max-width: 740px) {

  .modal-container-saved{
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