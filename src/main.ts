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
    clientId: import.meta.env.VITE_GOOGLE_LOGIN_ID
})
//app.use(Ads.AutoAdsense, { adClient: import.meta.env.VITE_ADSENSE_ID, isNewAdsCode: true })
app.use(ScriptX)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueSlider', VueSlider)
app.config.globalProperties.emitter = emitter
app.mount("#app")