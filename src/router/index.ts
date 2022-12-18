import { createRouter, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router';
import Main from '../components/MainPage.vue'
import SearchResultPage from '../components/SearchResultPage.vue'
import ViewCollectionPage from '../components/ViewCollectionPage.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'MainPage',
        component: Main
    },
    {
        path: '/search/:plugin/:search',
        name: 'SearchResultPage',
        component: SearchResultPage
    },
    {
        path: '/view-templates',
        name: 'ViewCollectionPage',
        component: ViewCollectionPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router