import { createRouter, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router';
import Main from '../components/MainPage.vue'
import SearchResultPage from '../components/SearchResultPage.vue'
import ViewCollectionPage from '../components/ViewCollectionPage.vue'
import AndroidPage from '../components/AndroidPage.vue'
import RedirectPage from '../components/RedirectPage.vue'
import ImpressumPage from '../components/ImpressumPage.vue'

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
    {
        path: '/android',
        name: 'AndroidPage',
        component: AndroidPage
    },
    {
        path: '/:token',
        name: 'RedirectPage',
        component: RedirectPage
    },
    {
        path: '/impressum',
        name: 'ImpressumPage',
        component: ImpressumPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router