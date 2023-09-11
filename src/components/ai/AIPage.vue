<template>
  <div class="center-horizontal">
    <div>
      <MainNav/>
      <div>

        <div class="center-horizontal">

        </div>

        <div class="feedback-page">
          <div class="feedback-grid center-horizontal">

            <AIView
                v-for="(dat) in data"
                :headline="dat.headline"
                :seed="dat.seed"
                :checkpoint="dat.checkpoint"
                :artist="dat.artist"
                :image="'http://212.227.183.160:3002/image/' + dat.id + '.png'"
              />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import AIView from "./AIView.vue";
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue} from "firebase/database"
import {FirebaseController} from "../intercraSystemCode/controllers/FirebaseController";
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import {decodeCredential, googleOneTap} from "vue3-google-login";
import MainNav from "../views/MainNav.vue";


export default {
  name: "AIPage",
  components: {MainNav, AIView},

  data(){
    return{
      data: [],
      db: null
    }
  },

  created() {


    EventBus.addEventListener('firebase-image', (event) => {
      let data = event.data
      let keys = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          keys.push(key);
        }
      }

      /*let dataset = "00001-2190002187;;;v1-5-pruned;;;space with a bright sun and a planet. there is also a shooting star and in the background you can see stars. 8k ultrarealistic, photorealistic;;;Intercra Dev---00009-2891928716;;;v1-5-pruned;;;night sky from earth with a bright sun. there is also a shooting star and in the background you can see stars. 8k ultrarealistic, photorealistic, at the bottom you can see hills and mountains;;;Intercra Dev---00015-701441619;;;v1-5-pruned;;;night sky from earth with a bright sun. there is also a shooting star and in the background you can see stars. 8k ultrarealistic, photorealistic, at the bottom you can see hills and mountains;;;Intercra Dev---00016-707991844;;;v1-5-pruned;;;night sky from earth with a bright sun. there is also a shooting star and in the background you can see stars. 8k ultrarealistic, photorealistic, at the bottom you can see hills and mountains;;;Intercra Dev---00017-3984263173;;;v1-5-pruned;;;night sky from earth with a bright sun. there is also a shooting star and in the background you can see stars. 8k ultrarealistic, photorealistic, at the bottom you can see hills and mountains;;;Intercra Dev---00030-425744044;;;v1-5-pruned;;;man with a suit riding a horse in the desert, it is day and the sun shines. ultrarealistic, 8k, photorealistic;;;Intercra Dev---00032-2100450198;;;v1-5-pruned;;;man with a suit riding a horse in the desert, it is day and the sun shines. ultrarealistic, 8k, photorealistic;;;Intercra Dev---00037-3557205429;;;v1-5-pruned;;;man with a suit riding a horse in the desert, it is day and the sun shines. cartoon style;;;Intercra Dev---00068-3890639879;;;v1-5-pruned;;;a monkey with a hat holding a gun on a field in the sunset. 8k, ultrarealistic, photorealistic;;;Intercra Dev---00074-4011754447;;;v1-5-pruned;;;a futuristic city on the moon, the background is space, photorealistic, 8k, ultrarealistic;;;Intercra Dev---00076-91809475;;;ghostmix_v20Bakedvae;;;a futuristic city on the moon, the background is space, photorealistic, 8k, ultrarealistic;;;Intercra Dev---00078-993858714;;;ghostmix_v20Bakedvae;;;a futuristic city on the moon, the background is space, photorealistic, 8k, ultrarealistic;;;Intercra Dev---00079-885708079;;;ghostmix_v20Bakedvae;;;a futuristic city on the moon, the background is space, photorealistic, 8k, ultrarealistic;;;Intercra Dev---00080-2137782167;;;ghostmix_v20Bakedvae;;;a wormhole;;;Intercra Dev---00082-2912221323;;;ghostmix_v20Bakedvae;;;a wormhole in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00084-3912292752;;;v1-5-pruned;;;a wormhole in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00085-913226402;;;v1-5-pruned;;;a wormhole in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00086-479044187;;;v1-5-pruned;;;a wormhole in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00087-3197364110;;;v1-5-pruned;;;a wormhole in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00089-662482360;;;v1-5-pruned;;;a supernova in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00090-1837407002;;;v1-5-pruned;;;a supernova in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00091-713829;;;v1-5-pruned;;;a blue supernova in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00095-1399485491;;;v1-5-pruned;;;a blue supernova in the space, bright, 8k, ultrarealistic, photorealistic;;;Intercra Dev---00099-3412449017;;;v1-5-pruned;;;there is a mountain and on the top there is a spaceship, photorealistic, 8k, ultrarealistic;;;Intercra Dev---00099-3412449017;;;v1-5-pruned;;;there is a mountain and on the top there is a spaceship, photorealistic, 8k, ultrarealistic;;;Intercra Dev---00103-792008765;;;ghostmix_v20Bakedvae;;;there is a mountain and on the top there is an ufo, photorealistic, 8k, ultrarealistic;;;Intercra Dev---00106-1607067474;;;ghostmix_v20Bakedvae;;;in the jungle there is an ufo, photorealistic, 8k, ultrarealistic;;;Intercra Dev---00110-3347400690;;;ghostmix_v20Bakedvae;;;in the jungle there is a broken ufo on the ground. there is a man looking to the ufo. photorealistic, 8k, ultrarealistic;;;Intercra Dev"
      let split = dataset.split("---")


      for(let i = 0; i < split.length; i++){
        let line = split[i].split(";;;")
        fc.writeImage(line[0], line[0].split("-")[1], line[2], line[1], line[3])
      }*/

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
    })
  },

  beforeDestroy() {
  },

  mounted() {
    let fc = new FirebaseController()
    fc.getImages()
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

  },

}
</script>
