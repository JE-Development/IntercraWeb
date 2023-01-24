import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'
import Notifications from '@kyvg/vue3-notification'

import './assets/main.css'
import './assets/colors.css'
import './assets/view-design.css'
import './assets/animations.scss'

const emitter = mitt()

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(Notifications)
//app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.emitter = emitter
app.mount("#app")


function onCheckBoxClicked(id: any){
    console.log("in main");
}
