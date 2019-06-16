import Vuex from 'vuex'

import actions from './comments-actions'
import mutations from './comments-mutations'

export default {
    state:  {

        list: [],

    },
    actions,
    mutations,
}