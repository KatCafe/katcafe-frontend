import Vuex from 'vuex'

import actions from './notifications-actions'
import mutations from './notifications-mutations'
import getters from "./notifications-getters"

export default {
    state:  {

        map: {},

        initialized: false,
        unreadCount: 0,

        pageLoading: false,
        pageIndex: 0,
        pageCount: 20,
        pageMore: true,

    },
    actions,
    mutations,
    getters,
}