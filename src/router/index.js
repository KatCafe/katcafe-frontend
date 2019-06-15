import Vue from 'vue'
import Router from 'vue-router'
import ConstsSecret from "consts/consts-secret"

Vue.use(Router)

// route-level code splitting

const HomePage = () => import('client/pages/home.page');
const ChannelPage = () => import('client/pages/channel.page');
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
    const nationalRoutes = flags.map( it => { return {
        path: `/${it.value}/:slug`, component: ChannelPage,
    }});

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
            { path: '/'+ConstsSecret.secret+'/add-channel', component: AddChannelPage, },

            { path: '/:slug', component: ChannelPage, },
            ...nationalRoutes,


        ]
    })
}
