/*
        I USE VUEX SAGA for ASYNC actions
 */
import * as cloneDeep from 'lodash/cloneDeep';
import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global/global-module'
import channels from './modules/channels/channels-module'
import topics from './modules/content/topics/topics-module'
import comments from './modules/content/comments/comments-module'
import localization from './modules/localization/localization-module'
import captcha from "./modules/captcha/captcha-module"
import auth from "./modules/auth/auth-module"
import content from "./modules/content/content-module"
import digitalSignature from "./modules/digital-signature/digital-signature-module"
import notifications from "./modules/notifications/notifications-module"

Vue.use(Vuex);

export function createStore () {
    return new Vuex.Store(cloneDeep({
        modules: {

            global,
            channels,
            topics,
            comments,
            localization,
            captcha,
            auth,
            content,
            digitalSignature,
            notifications,
        }
        })
    );
}

