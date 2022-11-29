import { createRouter, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router';
import Main from '../components/MainPage.vue'
import Test from '../components/SearchResultPage.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'MainPage',
        component: Main
    },
    {
        path: '/search/:search',
        name: 'SearchResultPage',
        component: Test
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router