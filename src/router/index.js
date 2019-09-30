import Vue from 'vue'
import Router from 'vue-router'
import ConstsSecret from "consts/consts-secret"

Vue.use(Router)

// route-level code splitting

const HomePage = () => import('client/pages/home.page');
const AdminPage = () => import('client/pages/admin.page');

const ChannelPage = () => import('client/pages/channel.page');
const TopicPage = () => import('client/pages/topic.page');
const AddChannelPage = () => import('client/pages/add-channel.page');
const TypographyPage = () => import('client/pages/typography.page');
const LoginPage = () => import('client/pages/auth/login.page');
const SignupPage = () => import('client/pages/auth/signup.page');
const LogoutPage = () => import('client/pages/auth/logout.page');

import Flags from 'client/components/UI/elements/select/flags/flags';
import UserRole from "client/components/modules/auth/user-role"

export function createRouter (store){

    function guardAdminAuth(to, from, next){

        if (store.state.auth.user && store.state.auth.user.role === UserRole.SYS_ADMIN) return next();

        if (to.path !== '/login') next('/login');

        next();
    }

    function guardAuth(to, from, next){

        if (store.state.auth.user) return next();

        if (to.path !== '/login') next('/login');

        next();
    }

    function guardHomeAuth(to, from, next){

        if (store.state.auth.user){

            if (store.state.auth.user.admin) return next('/admin');
            else return next('/');

        }

        if (to.path !== '/login' && to.path !== '/register' && to.path !== '/signup') next('/login');
         next();

    }

    const flags = Flags.getFlags();

    const nationalChannelRoutes = flags.map( it => ( { path: `/${it.value}`, component: HomePage, }) );
    const nationalChannelRoutesPageIndex = flags.map( it => ({ path: `/${it.value}/pageIndex/:pageIndex`, component: HomePage, }) );

    const nationalChannelSlugsRoutes = flags.map( it => ({ path: `/${it.value}/:slug`, component: ChannelPage, }) );
    const nationalChannelSlugsRoutesPageIndex = flags.map( it => ({ path: `/${it.value}/:slug/pageIndex/:pageIndex`, component: ChannelPage, }) );

    const nationalTopicSlugsRoutes = flags.map( it => ( { path: `/${it.value}/:channel/:slug`, component: TopicPage, } ));
    const nationalTopicSlugsRoutesPageIndex = flags.map( it => ( { path: `/${it.value}/:channel/:slug/pageIndex/:pageIndex`, component: TopicPage, }) );

    return new Router({
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            //console.log('router scroll', to, from, to === from);

            if (to.hash)
                return {
                    selector: to.hash
                };

            if (savedPosition)
                return savedPosition;
            else
                return {x: 0, y: 0}


        },
        routes: [

            { path: '/', component: HomePage },
            { path: '/pageIndex/:pageIndex', component: HomePage },

            { path: '/admin', component: AdminPage, beforeEnter: guardAdminAuth },


            { path: '/typography', component: TypographyPage },
            { path: '/add-channel', component: AddChannelPage, beforeEnter: guardAuth },

            ...nationalChannelRoutes,
            ...nationalChannelRoutesPageIndex,

            ...nationalChannelSlugsRoutes,
            ...nationalChannelSlugsRoutesPageIndex,

            ...nationalTopicSlugsRoutes,
            ...nationalTopicSlugsRoutesPageIndex,

            { path: '/login', component: LoginPage, beforeEnter: guardHomeAuth, },
            { path: '/signin', component: LoginPage, beforeEnter: guardHomeAuth,},

            { path: '/signup', component: SignupPage, beforeEnter: guardHomeAuth, },
            { path: '/register', component: SignupPage, beforeEnter: guardHomeAuth, },

            { path: '/logout', component: LogoutPage, beforeEnter: guardHomeAuth, },

            { path: '/:slug', component: ChannelPage, },
            { path: '/:slug/pageIndex/:pageIndex', component: ChannelPage, },

            { path: '/:channel/:slug', component: TopicPage, },
            { path: '/:channel/:slug/pageIndex/:pageIndex', component: TopicPage, },


        ]
    })
}
