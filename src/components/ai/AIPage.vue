<template>
  <div class="center-horizontal">
    <div>
      <MainNav/>
      <ImageRequestPopup :show="imageShow" @close="closeImagePopup" @created="startImageRequest"/>
      <div>

        <div class="center-horizontal">
          <div>
            <div class="error-color" v-if="serverError"><h4>The Intercra backend server is down</h4></div>
            <UsageButton :onClick="suggestClicked" width="320" height="40" padding="0px 0px">
              <p class="white" style="font-size: 23px">request images</p>
            </UsageButton>

            <UsageButton :onClick="seePostsClicked" width="320" height="40" padding="0px 0px">
              <p class="white" style="font-size: 23px">see your requests</p>
            </UsageButton>
          </div>
        </div>

        <div class="feedback-page">
          <div class="feedback-grid center-horizontal">

            <AIView
                v-for="(dat) in data"
                :headline="dat.headline"
                :seed="dat.seed"
                :checkpoint="dat.checkpoint"
                :artist="dat.artist"
                :image="'https://raw.githubusercontent.com/JE-Development/ImageStorage/main/ai/' + dat.id + '.png'"
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
import router from "../../router";


export default {
  name: "AIPage",
  components: {ImageRequestPopup, UsageButton, MainNav, AIView},

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
      fc.getImages().then((data) => {
        let keys = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            keys.push(key);
          }
        }

        let dataset = "00111-1695040952;;;v1-5-pruned (img to img);;;a blue saturn glowing in the space. In the space there are stars and nebula. 8k, ultrarealistic, photorealistic;;;Intercra Dev;;;blank---00112-1695041102;;;v1-5-pruned (img to img);;;a blue saturn glowing in the space. In the space there are stars and nebula. 8k, ultrarealistic, photorealistic;;;Intercra Dev;;;blank---00113-1695041194;;;v1-5-pruned (img to img);;;a blue saturn glowing in the space. In the space there are stars and nebula. 8k, ultrarealistic, photorealistic;;;Intercra Dev;;;blank---00114-1695041368;;;v1-5-pruned (img to img);;;a blue saturn glowing in the space. In the space there are stars and nebula. 8k, ultrarealistic, photorealistic;;;Intercra Dev;;;blank---00115-1695041238;;;v1-5-pruned (img to img);;;a blue saturn glowing in the space. In the space there are stars and nebula. 8k, ultrarealistic, photorealistic;;;Intercra Dev;;;blank"
        let split = dataset.split("---")


        for(let i = 0; i < split.length; i++){
          let line = split[i].split(";;;")
          fc.writeImage(line[0], line[0].split("-")[1], line[2], line[1], line[3], line[4])
        }

        for(let i = 0; i < keys.length; i++){
          let set = {
            headline: data[keys[i]].prompt,
            checkpoint: data[keys[i]].checkpoint,
            seed: data[keys[i]].seed,
            artist: data[keys[i]].artist,
            id: keys[i]
          }
          this.data.push(set)
        }
        this.data = this.data.reverse()
      })
    },
    notResponding(){
      this.serverError = true
    },

    suggestClicked(){
      this.imageShow = true
    },

    seePostsClicked(){
      if(this.getCookies("google_email") === null){
        this.$notify("You are not logged in")
      }else{
        router.push('/ai/requests');
      }

    },

    startImageRequest(){

    },

    closeImagePopup(){
      this.imageShow = false
    }



  },

}
</script>
