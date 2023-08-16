import { createRouter, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router';
import Main from '../components/MainPage.vue'
import SearchResultPage from '../components/SearchResultPage.vue'
import ViewCollectionPage from '../components/ViewCollectionPage.vue'
import RedirectPage from '../components/RedirectPage.vue'
import ImpressumPage from '../components/ImpressumPage.vue'
import FeedPage from '../components/feed/FeedPage.vue'
import SettingsPage from '../components/SettingsPage.vue'
import NotFoundPage from '../components/NotFoundPage.vue'
import NoAdsPage from "../components/NoAdsPage.vue";
import FeedbackPage from "../components/feedback/FeedbackPage.vue";

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
        name: 'ViewCollectionPage',
        component: ViewCollectionPage
    },
    {
        path: '/:token',
        name: 'RedirectPage',
        component: RedirectPage
    },
    {
        path: '/google/callback/:token',
        name: 'RedirectPage',
        component: RedirectPage
    },
    {
        path: '/impressum',
        name: 'ImpressumPage',
        component: ImpressumPage
    },
    {
        path: '/feed',
        name: 'FeedPage',
        component: FeedPage
    },
    {
        path: '/settings',
        name: 'SettingsPage',
        component: SettingsPage
    },
    {
        path: '/noads',
        name: 'NoAdsPage',
        component: NoAdsPage
    },
    {
        path: '/feedback',
        name: 'FeedbackPage',
        component: FeedbackPage
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFoundPage',
        component: NotFoundPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router