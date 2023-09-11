

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
                          ref="usernameinput"
                          @keyup.enter="enterClicked()"
                          placeholder="Create username here"
                          class="username-input center-horizontal username-input-color search-input-border-color"/>
                    </div>
                    <div style="height: 10px"></div>
                    <div class="center-horizontal">
                      <UsageButton :onClick="enterClicked" width="200" height="30" padding="0px 0px">
                        <p class="white" style="font-size: 20px">Create Username</p>
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
  name: "CreateUsername",
  components: {UsageButton, ViewTemplatesPage, PluginCheckBox},

  props: {
    show: Boolean,
  },
  data(){
    return{
      savedContent: [],
      errorText: "",
      username: ""
    }
  },


  created() {
    EventBus.addEventListener('firebase-users-username', (event) => {
      const keys = [];
      for (const key in event.data) {
        if (event.data.hasOwnProperty(key)) {
          keys.push(key);
        }
      }

      let valide = true

      for(let i = 0; i < keys.length; i++){
        let existing = event.data[keys[i]].username
        if(this.username === existing){
          valide = false
        }
      }
      if(valide){
        this.$emit('created', this.$refs.usernameinput.value);
        this.errorText = ""
      }else{
        this.errorText = "This username is taken"
      }

    })
  },

  methods: {
    onClose(){
      this.$emit('close');
    },
    callback(){
      this.checkUsername(this.$refs.usernameinput.value)
    },
    enterClicked(){
      this.callback()
    },

    checkUsername(username){
      const regex = /^[a-zA-Z0-9-_\.][a-zA-Z0-9-_\.]*$/;
      let valide = regex.test(username);
      if(valide){
        this.username = username
        let fc = new FirebaseController()
        fc.getUsersForUsername()
      }else{
        this.errorText = "Only these characters are allowed: a-z A-Z 0-9 . _ - (space is not allowed)"
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