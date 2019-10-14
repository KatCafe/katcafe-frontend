import Vuex from 'vuex'

import actions from './notifications-actions'
import mutations from './notifications-mutations'

export default {
    state:  {

        map: {},

        initialized: false,
        unreadCount: 0,

    },
    actions,
    mutations,
}