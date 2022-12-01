import { createRouter, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router';
import Main from '../components/MainPage.vue'
import SearchResultPage from '../components/SearchResultPage.vue'
import ViewTemplatesPage from '../components/ViewTemplatesPage.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'MainPage',
        component: Main
    },
    {
        path: '/search/:search',
        name: 'SearchResultPage',
        component: SearchResultPage
    },
    {
        path: '/view-templates',
        name: 'ViewTemplatesPage',
        component: ViewTemplatesPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router