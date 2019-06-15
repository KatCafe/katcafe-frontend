/*
        I USE VUEX SAGA for ASYNC actions
 */

import Vue from 'vue'
import Vuex from 'vuex'

import GlobalModule from './modules/global/global-module'
import ChannelsModule from './modules/channels/channels-module'
import LocalizationModule from './modules/localization/localization-module'

Vue.use(Vuex);

export function createStore () {
    return new Vuex.Store({
        modules: {

            global: GlobalModule,
            channels: ChannelsModule,
            localization: LocalizationModule,

        }
    });
}

