

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
                    <p id="plugin-menu-text">Cancel</p>
                  </button>
                </div>

                <div class="center-horizontal popup-width">
                  <div>
                    <p class="white">You can submit requests to Intercra here to generate AI images. These images are visible to everyone. It may take several days for it to be provided.</p>
                    <div style="height: 10px"></div>
                    <div class="center-horizontal">
                      <textarea ref="prompt" class="textarea textarea-color search-input-border-color" placeholder="Type in the prompt" style="white-space: pre-wrap;"></textarea>
                    </div>
                    <div style="height: 10px"></div>

                    <div class="center-horizontal">
                      <input
                          ref="seedinput"
                          placeholder="Seed (leave empty if random)"
                          class="username-input center-horizontal username-input-color search-input-border-color"
                          style="border-radius: 5px; font-size: 17px; height: 30px"/>

                      <div style="height: 10px"></div>
                    </div>

                    <div class="center-horizontal">
                      <div>
                        <AIModelCheckBox @click="imageClicked('1')" :check="model1" :title="model1Text"/>
                        <AIModelCheckBox @click="imageClicked('2')" :check="model2" :title="model2Text"/>
                        <AIModelCheckBox @click="imageClicked('3')" :check="model3" :title="model3Text"/>
                        <AIModelCheckBox @click="imageClicked('4')" :check="model4" :title="model4Text"/>
                      </div>
                    </div>

                    <div style="height: 10px"></div>

                    <div class="center-horizontal">
                      <UsageButton :onClick="postClicked" width="200" height="30" padding="0px 0px">
                        <p class="white" style="font-size: 20px">post this</p>
                      </UsageButton>
                    </div>
                    <div class="center-horizontal">
                      <p class="error-color">{{errorText}}</p>
                    </div>
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
import UsageButton from "../views/UsageButton.vue";
import {FirebaseController} from "../intercraSystemCode/controllers/FirebaseController";
import AIModelCheckBox from "../views/AIModelsCheckBox.vue";

export default {
  name: "ImageRequestPopup",
  components: {AIModelCheckBox, UsageButton, ViewTemplatesPage, PluginCheckBox},

  props: {
    show: Boolean,
  },
  data(){
    return{
      savedContent: [],
      errorText: "",
      username: "",
      headline: "",
      content: "",
      opt: ['first', 'second', 'third'],
      model1: false,
      model2: true,
      model3: false,
      model4: false,
      model1Text: "sd-v1-4",
      model2Text: "v1-5-pruned",
      model3Text: "v2-1_768-ema-pruned",
      model4Text: "ghostmix_v20Bakedvae",
    }
  },


  created() {

  },

  methods: {
    onClose(){
      this.$emit('close');
    },

    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(this.isCookiesAllowed()){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
    postClicked(){
      if(!this.model1 && !this.model2 && !this.model3 && !this.model4){
        this.errorText = "no model is selected"
      }else{
        if(this.$refs.prompt.value === "") {
          this.errorText = "The prompt is empty"
        }else{
          if(this.getCookies("google_email") !== null){
            this.errorText = ""

            let prompt = this.$refs.prompt.value
            let seed = this.$refs.seedinput.value === "" ? "random" : this.$refs.seedinput.value
            let model = ""
            let time = this.getCurrentDateTime()

            if(this.model1){
              model = this.model1Text
            }else if(this.model2){
              model = this.model2Text
            }else if(this.model3){
              model = this.model3Text
            }else if(this.model4){
              model = this.model4Text
            }

            let fc = new FirebaseController()
            fc.postImageRequest(time, this.getCookies("google_username"), prompt, seed, model, "1")
            this.onClose()
          }else{
            this.errorText = "You are not logged in"
          }

        }
      }
    },

    formatEmail(email){
      email = email.replace(/\./g, "(dot)");
      email = email.replace("@", "(at)");
      return email
    },

    getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Monat von 0 bis 11, daher +1 und mit Nullen auffüllen
      const day = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const minute = String(now.getMinutes()).padStart(2, '0');
      const second = String(now.getSeconds()).padStart(2, '0');
      const millisecond = String(now.getMilliseconds()).padStart(3, '0');

      return `${year}${month}${day}${hour}${minute}${second}${millisecond}`
    },
    imageClicked(id){

      switch (id){
        case "1":
          this.model1 = !this.model1
          this.model2 = false
          this.model3 = false
          this.model4 = false
              break;
        case "2":
          this.model2 = !this.model2
          this.model1 = false
          this.model3 = false
          this.model4 = false
          break;
        case "3":
          this.model3 = !this.model3
          this.model2 = false
          this.model1 = false
          this.model4 = false
          break;
        case "4":
          this.model4 = !this.model4
          this.model2 = false
          this.model3 = false
          this.model1 = false
          break;
      }
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