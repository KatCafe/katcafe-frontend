import Vuex from 'vuex'

import actions from './topics-actions'
import mutations from './topics-mutations'

export default {
    state:  {

        topic: null,
        list: [],
        map: {},

        pageLoading: false,
        pageIndex: 0,
        pageCount: 20,
        pageMore: true,

    },
    actions,
    mutations,
}