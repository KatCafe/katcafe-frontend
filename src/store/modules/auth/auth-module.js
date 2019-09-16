import Vuex from 'vuex'

import actions from './auth-actions'
import mutations from './auth-mutations'
import getters from "./auth-getters"

export default {
    state:  {

        user: undefined,

        session: undefined,

    },
    actions,
    mutations,
    getters,
}