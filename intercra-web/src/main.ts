import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import {IntercraController} from "../src/components/intercraSystemCode/controllers/IntercraController";

let ic = new IntercraController();
ic.startSearch();

const app = createApp(App)
app.mount("#app")


