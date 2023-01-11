import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'

import './assets/main.css'
import './assets/colors.css'
import './assets/view-design.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHatWizard)

const emitter = mitt()

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.emitter = emitter
app.mount("#app")


function onCheckBoxClicked(id: any){
    console.log("in main");
}
