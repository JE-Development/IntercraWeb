import Vue, {createApp} from 'vue'
import App from './App.vue'
import Results from './components/Results.vue'
import MainSearch from "./components/MainSearch.vue";
import { createRouter,createWebHistory} from 'vue-router'

const app = createApp(App);

app.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: {
                name: "MainSearch",
                component: MainSearch
            }
        },
        {
            path: '/results',
            name: 'Results',
            component: Results
        },
    ]
});

export default new createRouter()