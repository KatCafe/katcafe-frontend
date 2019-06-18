import Vue from 'vue'
import Router from 'vue-router'
import ConstsSecret from "consts/consts-secret"

Vue.use(Router)

// route-level code splitting

const HomePage = () => import('client/pages/home.page');
const ChannelPage = () => import('client/pages/channel.page');
const TopicPage = () => import('client/pages/topic.page');
const AddChannelPage = () => import('client/pages/add-channel.page');
const TypographyPage = () => import('client/pages/typography.page');

import {getFlags} from 'client/components/UI/elements/select/flags/flags';

export function createRouter (store){

    function guardAuth(to, from, next){

        if (store.state.auth.user) return next();

        if (to.path !== '/login') next('/login');
        else next();

    }

    function guardHomeAuth(to, from, next){

        if (store.state.auth.user){

            if (store.state.auth.user.admin) return next('/admin');
            else return next('/dashboard');

        }

        if (to.path !== '/login' && to.path !== '/register') next('/login');
        else next();

    }

    const flags = getFlags();

    const nationalChannelRoutes = flags.map( it => { return { path: `/${it.value}`, component: HomePage, }});
    const nationalChannelRoutesPageIndex = flags.map( it => { return { path: `/${it.value}/pageIndex/:pageIndex`, component: HomePage, }});

    const nationalChannelSlugsRoutes = flags.map( it => { return { path: `/${it.value}/:slug`, component: ChannelPage, }});
    const nationalChannelSlugsRoutesPageIndex = flags.map( it => { return { path: `/${it.value}/:slug/pageIndex/:pageIndex`, component: ChannelPage, }});

    const nationalTopicSlugsRoutes = flags.map( it => { return { path: `/${it.value}/:channel/:slug`, component: TopicPage, }});
    const nationalTopicSlugsRoutesPageIndex = flags.map( it => { return { path: `/${it.value}/:channel/:slug/pageIndex/:pageIndex`, component: TopicPage, }});

    return new Router({
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            //console.log('router scroll', to, from, to === from);

            if (savedPosition) {
                return savedPosition
            } else {
                if (to.hash) {
                    return {
                        selector: to.hash
                    }
                }
            }

        },
        routes: [

            { path: '/', component: HomePage },
            { path: '/typography', component: TypographyPage },
            { path: '/add-channel', component: AddChannelPage, },

            ...nationalChannelRoutes,
            ...nationalChannelRoutesPageIndex,

            ...nationalChannelSlugsRoutes,
            ...nationalChannelSlugsRoutesPageIndex,

            ...nationalTopicSlugsRoutes,
            ...nationalTopicSlugsRoutesPageIndex,

            { path: '/:slug', component: ChannelPage, },
            { path: '/:slug/pageIndex/:pageIndex', component: ChannelPage, },

            { path: '/:channel/:slug', component: TopicPage, },
            { path: '/:channel/:slug/pageIndex/:pageIndex', component: TopicPage, },


        ]
    })
}
