/*
        I USE VUEX SAGA for ASYNC actions
 */

import Vue from 'vue'
import Vuex from 'vuex'

import GlobalModule from './modules/global/global-module'
import ChannelsModule from './modules/channels/channels-module'
import TopicsModule from './modules/content/topics/topics-module'
import CommentsModule from './modules/content/comments/comments-module'
import LocalizationModule from './modules/localization/localization-module'
import CaptchaModule from "./modules/captcha/captcha-module"
import AuthModule from "./modules/auth/auth-module"
import ContentModule from "./modules/content/content-module"

Vue.use(Vuex);

export function createStore () {
    return new Vuex.Store({
        modules: {

            global: GlobalModule,
            channels: ChannelsModule,
            topics: TopicsModule,
            comments: CommentsModule,
            localization: LocalizationModule,
            captcha: CaptchaModule,
            auth: AuthModule,
            content: ContentModule,
        }
    });
}

