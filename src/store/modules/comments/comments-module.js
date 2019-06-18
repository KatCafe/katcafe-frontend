import Vuex from 'vuex'

import actions from './comments-actions'
import mutations from './comments-mutations'

export default {
    state:  {

        list: [],
        map: [],

        pageLoading: false,
        pageIndex: 0,
        pageCount: 20,
        pageMore: true,

    },
    actions,
    mutations,
}