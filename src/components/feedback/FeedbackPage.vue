<template>
    <div class="center-horizontal">
      <div>
        <MainNav/>
        <PostFeedbackPopup :show="postShow" @close="closePostPopup" @created="startPosting"/>
        <div>

            <div class="center-horizontal">
                <h2>
                    <span class="feedback-code-color-0 feedback-font">denied</span> |
                    <span class="feedback-code-color-1 feedback-font">pending approval</span> |
                    <span class="feedback-code-color-2 feedback-font">approved, comming soon</span> |
                    <span class="feedback-code-color-3 feedback-font">implemented</span>
                </h2>
            </div>

            <div class="center-horizontal">
                <div>
                    <p class="decent-color">You can suggest a feature you want to be implemented or you can report a bug</p>
                    <div class="center-horizontal">
                        <div>
                          <UsageButton :onClick="feedbackClicked" width="320" height="40" padding="0px 0px">
                            <p class="white" style="font-size: 23px">suggest/report something</p>
                          </UsageButton>

                          <UsageButton :onClick="seePostsClicked" width="320" height="40" padding="0px 0px">
                            <p class="white" style="font-size: 23px">see your posts</p>
                          </UsageButton>
                        </div>
                    </div>
                </div>
            </div>

          <div class="feedback-page">
            <div class="feedback-grid center-horizontal">


              <FeedbackView
                  v-for="(dat) in data"
                      :headline="dat.headline"
                      :teaser="dat.content"
                      :status="dat.status"
                      :username="dat.username"
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
import router from "../../router";

export default {
  name: "FeedbackPage",
    components: {CreateUsername, PostFeedbackPopup, MainNav, UsageButton, FeedbackView},

    data(){
      return{
        postShow: false,

        data: []
      }
    },

  created() {

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

    closePostPopup(){
      this.postShow = false
      this.startRequest()
    },

    feedbackClicked(){
      this.postShow = true
    },

    seePostsClicked(){
      if(this.getCookies("google_email") === null){
        this.$notify("You are not logged in")
      }else{
        router.push('/feedback/posts');
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
          let set = {
            headline: data[keys[i]].headline,
            content: data[keys[i]].content,
            username: data[keys[i]].username,
            status: data[keys[i]].status,
          }
          this.data.push(set)
        }
        this.data = this.data.reverse()
      })
    },

  },

}
</script>

