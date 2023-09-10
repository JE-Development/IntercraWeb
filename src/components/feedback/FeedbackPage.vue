<template>
    <div class="center-horizontal">
      <div>
        <div>

            <div class="center-horizontal">
                <h2>
                    <span class="feedback-code-color-0">denied</span> |
                    <span class="feedback-code-color-1">pending approval</span> |
                    <span class="feedback-code-color-2">approved, comming soon</span> |
                    <span class="feedback-code-color-3">implemented</span>
                </h2>
            </div>

            <div class="center-horizontal">
                <div>
                    <p class="decent-color">You can suggest a feature you want to be implemented or you can report a bug</p>
                    <div class="center-horizontal">
                        <UsageButton>
                            <h1 class="white">suggest/report something</h1>
                        </UsageButton>


                        <!--<GoogleLogin :callback="callback" auto-login/>/!-->
                        <GoogleLogin :callback="callback"/>


                    </div>
                </div>
            </div>

          <div class="feedback-page">
            <div class="feedback-grid center-horizontal">


              <FeedbackView
                      :headline="'more plugins'"
                      :teaser="'i wish this search engine has more plugins as amazon or something else'"
                      :status="0"
                      :username="'jason00'"
              />




            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>


import {PluginController} from "../intercraSystemCode/controllers/PluginController";
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import {IntercraController} from "../intercraSystemCode/controllers/IntercraController";
import FeedbackView from "./FeedbackView.vue";
import UsageButton from "../views/UsageButton.vue";
import {decodeCredential, googleOneTap} from "vue3-google-login";
import axios from "axios";

export default {
  name: "FeedbackPage",
    components: {UsageButton, FeedbackView},

    data(){
      return{
          clientId: '722509822656-m5pu2b1umlov5200q48cehmfefj8j8h0.apps.googleusercontent.com',
          dataFromPHP: [],
      }
    },

  created() {
      axios.get('/server.php') // Die URL Ihrer PHP-Datei auf dem Server
          .then(response => {
              this.dataFromPHP = response.data;
          })
          .catch(error => {
              console.error('Fehler beim Abrufen der Daten:', error);
          });
  },

  beforeDestroy() {
  },

  mounted() {
      /*googleOneTap({ autoLogin: true })
          .then((response) => {
              // This promise is resolved when user selects an account from the the One Tap prompt
              console.log("Handle the response", response)
          })
          .catch((error) => {
              console.log("Handle the error", error)
          })*/
  },

  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(true){
        return this.$cookies.set(key, value, 2147483647);
      }
    },

      callback(response){
        /*
        email: userData.email
        name: userData.name
        profile picture: userData.picture
         */
          const userData = decodeCredential(response.credential)
        console.log("callback: ", userData)
      }

  },

}
</script>

<style>
.google-signin-button {
    color: white;
    background-color: red;
    height: 50px;
    font-size: 16px;
    border-radius: 10px;
    padding: 10px 20px 25px 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

