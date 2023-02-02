import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'
import Notifications from '@kyvg/vue3-notification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'


import './assets/main.css'
import './assets/colors.css'
import './assets/view-design.css'
import './assets/animations.scss'

const emitter = mitt()

library.add(faUserSecret)

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(Notifications)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.emitter = emitter
app.mount("#app")


function onCheckBoxClicked(id: any){
    console.log("in main");
}
