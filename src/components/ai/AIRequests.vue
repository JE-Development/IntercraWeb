<template>
  <div class="center-horizontal">
    <div>
      <div>

        <MainNav/>



        <div class="center-horizontal">
          <div>
            <div class="error-color" v-if="serverError"><h4>The Intercra backend server is down. No Images can be displayed.</h4></div>
          </div>
        </div>

        <div class="center-horizontal">
          <div>
            <div class="center-horizontal">
              <h2>
                <span class="ai-code-color-0 ai-status-font">denied</span> |
                <span class="ai-code-color-1 ai-status-font">pending generation</span> |
                <span class="ai-code-color-2 ai-status-font">generated</span>
              </h2>
            </div>
            <div class="center-horizontal">
              <p class="decent-color">Requested content may take several days to become available.</p>
            </div>
          </div>
        </div>

        <div class="feedback-page">
          <div class="feedback-grid center-horizontal">

            <ImageRequestView
                v-for="(dat) in data"
                :headline="dat.headline"
                :seed="dat.seed"
                :checkpoint="dat.checkpoint"
                :artist="dat.artist"
                :id="dat.id"
                :status="dat.status"
                :onDeleteCallback="startRequest"
              />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import AIView from "./AIView.vue";
import {FirebaseController} from "../intercraSystemCode/controllers/FirebaseController";
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import MainNav from "../views/MainNav.vue";
import UsageButton from "../views/UsageButton.vue";
import ImageRequestPopup from "../views/ImageRequestPopup.vue";
import ImageRequestView from "./ImageRequestView.vue";


export default {
  name: "AIRequests",
  components: {ImageRequestView, ImageRequestPopup, UsageButton, MainNav, AIView},

  data(){
    return{
      data: [],
      db: null,
      serverError: false,
      imageShow: false
    }
  },

  created() {
  },

  beforeDestroy() {
  },

  mounted() {

    this.startRequest()

    /*

    fetch('https://raw.githubusercontent.com')
        .then(response => {
          if (response.ok) {
            this.startRequest()
          } else {
            this.notResponding()
          }
        })
        .catch(error => {
          this.notResponding()
        });*/
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
      this.serverError = false
      let fc = new FirebaseController()
      fc.getImageRequests().then((data) => {
        let keys = [];
        this.data = []
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            keys.push(key);
          }
        }

        for(let i = 0; i < keys.length; i++){
          if(data[keys[i]].username === this.getCookies("google_username")){
            let set = {
              headline: data[keys[i]].prompt,
              checkpoint: data[keys[i]].model,
              seed: data[keys[i]].seed,
              artist: data[keys[i]].username,
              status: data[keys[i]].status,
              id: keys[i]
            }
            this.data.push(set)
          }
        }
      })
    },
    notResponding(){
      this.serverError = true
    },

    suggestClicked(){
      this.imageShow = true
    },

    seePostsClicked(){

    },

    startImageRequest(){

    },

    closeImagePopup(){
      this.imageShow = false
    }



  },

}
</script>
