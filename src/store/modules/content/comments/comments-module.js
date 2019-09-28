import Vuex from 'vuex'

import actions from './comments-actions'
import mutations from './comments-mutations'
import getters from './comments-getters'

export default {
    state:  {

        map: [],

        pageLoading: false,
        pageIndex: 0,
        pageCount: 20,
        pageMore: true,

    },
    actions,
    mutations,
    getters,
}