import Vuex from 'vuex'

import actions from './topics-actions'
import mutations from './topics-mutations'
import getters from './topics-getters'

export default {
    state:  {

        topic: null,
        map: {},

        pageLoading: false,
        pageIndex: 0,
        pageCount: 20,
        pageMore: true,

    },
    actions,
    mutations,
    getters,

}