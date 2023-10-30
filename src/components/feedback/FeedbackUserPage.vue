<template>
    <div class="center-horizontal">
      <div>
        <MainNav/>
        <div>

            <div class="center-horizontal">
                <h2>
                    <span class="feedback-code-color-0 feedback-font">denied</span> |
                    <span class="feedback-code-color-1 feedback-font">pending approval</span> |
                    <span class="feedback-code-color-2 feedback-font">approved, comming soon</span> |
                    <span class="feedback-code-color-3 feedback-font">implemented</span>
                </h2>
            </div>

          <div class="feedback-page">
            <div class="feedback-grid center-horizontal">


              <FeedbackView
                  v-for="(dat) in data"
                      :headline="dat.headline"
                      :teaser="dat.content"
                      :status="dat.status"
                      :username="dat.username"
                  :isUserView="true"
                  :id="dat.id"
                  :onDeleteCallback="startRequest"
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
import MainNav from "../views/MainNav.vue";
import PostFeedbackPopup from "../views/PostFeedbackPopup.vue";
import CreateUsername from "../views/CreateUsernamePopup.vue";
import {FirebaseController} from "../intercraSystemCode/controllers/FirebaseController";

export default {
  name: "FeedbackPage",
    components: {CreateUsername, PostFeedbackPopup, MainNav, UsageButton, FeedbackView},

    data(){
      return{

        data: [],
        username: ""
      }
    },

  created() {
    this.username = this.getCookies("google_username")

  },

  mounted() {
    this.startRequest()
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

    startRequest(){
      let fc = new FirebaseController()
      fc.getFeedback().then((data) =>{
        this.data = []
        let keys = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            keys.push(key);
          }
        }

        for(let i = 0; i < keys.length; i++){
          if(this.username === data[keys[i]].username){
            let set = {
              headline: data[keys[i]].headline,
              content: data[keys[i]].content,
              username: data[keys[i]].username,
              status: data[keys[i]].status,
              id: keys[i]
            }
            this.data.push(set)
          }

        }
        this.data = this.data.reverse()
      })
    },

    formatEmail(email){
      email = email.replace(/\./g, "(dot)");
      email = email.replace("@", "(at)");
      return email
    },

  },

}
</script>

