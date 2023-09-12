

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
                    <div style="height: 10px"></div>
                    <div class="center-horizontal">
                      <input
                          ref="headlineinput"
                          @keyup.enter="enterClicked()"
                          placeholder="Create a headline"
                          class="username-input center-horizontal username-input-color search-input-border-color"/>
                    </div>
                    <div style="height: 10px"></div>
                    <div class="center-horizontal">
                      <textarea ref="textarea" class="textarea textarea-color search-input-border-color" placeholder="Suggest / report something" style="white-space: pre-wrap;"></textarea>
                    </div>
                    <div style="height: 10px"></div>
                    <div class="center-horizontal">
                      <UsageButton :onClick="enterClicked" width="200" height="30" padding="0px 0px">
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
export default {
  name: "PostFeedbackPopup",
  components: {UsageButton, ViewTemplatesPage, PluginCheckBox},

  props: {
    show: Boolean,
  },
  data(){
    return{
      savedContent: [],
      errorText: "",
      username: "",
      headline: "",
      content: ""
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
    enterClicked(){
      if(this.$refs.headlineinput.value === ""){
        this.errorText = "You need a headline"
      }else{
        if(this.$refs.textarea.value === ""){
          this.errorText = "There is no content in the text field"
        }else{
          if(this.getCookies("google_email") === null){
            this.errorText = "You have to be logged in"
          }else{
            this.headline = this.$refs.headlineinput.value
            this.content = this.$refs.textarea.value
            this.errorText = ""
            let fc = new FirebaseController()
            fc.getUser(this.formatEmail(this.getCookies("google_email"))).then((data) => {
              let time = this.getCurrentDateTime()
              let fc = new FirebaseController()
              fc.postFeedback(time, data.username, this.headline, this.content, "1")
              this.onClose()
            })
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