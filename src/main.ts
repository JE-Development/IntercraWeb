import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'
import Notifications from '@kyvg/vue3-notification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import VueSlider from 'vue-slider-component'
//import Ads from 'vue-google-adsense'
import ScriptX from 'vue-scriptx'
import vue3GoogleLogin from 'vue3-google-login'

import 'vue-slider-component/theme/default.css'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import './assets/main.css'
import './assets/colors.css'
import './assets/image.css'
import './assets/view-design.css'
import './assets/feed.css'
import './assets/feedback.css'
import './assets/nav.scss'
import './assets/animations.scss'
import './assets/sorting.scss'
import './assets/feed_anim.scss'

const emitter = mitt()

library.add(faUserSecret)

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(Notifications)
app.use(PerfectScrollbar)
app.use(vue3GoogleLogin, {
    clientId: '722509822656-m5pu2b1umlov5200q48cehmfefj8j8h0.apps.googleusercontent.com'
})
//app.use(Ads.AutoAdsense, { adClient: 'ca-pub-3904729559747077', isNewAdsCode: true })
app.use(ScriptX)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueSlider', VueSlider)
app.config.globalProperties.emitter = emitter
app.mount("#app")



/*
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyB7MTv0cTCC1U5PBw0w-BpLOZO68IXyveM",
    authDomain: "intercra-firebase.firebaseapp.com",
    databaseURL: "https://intercra-firebase-default-rtdb.firebaseio.com",
    projectId: "intercra-firebase",
    storageBucket: "intercra-firebase.appspot.com",
    messagingSenderId: "1036289266838",
    appId: "1:1036289266838:web:6f21f4e592591d81df1eb7"
};
const fireApp = initializeApp(firebaseConfig);

const db = getDatabase()

function writeData(username: string, email: string, blocked: string){
    const reference = ref(db, "users/" + username)
    set(reference, {
        email: email,
        blocked: blocked
    })
}

writeData("theCoolGuy", "something@something.com", "false")

const allUsers = ref(db, "users")
onValue(allUsers, (snapshot) => {
    const data = snapshot.val()
    console.log(data)
})*/
