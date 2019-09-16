import Vuex from 'vuex'

import actions from './auth-actions'
import mutations from './auth-mutations'

export default {
    state:  {

        user: undefined,

        session: undefined,

    },
    actions,
    mutations,
}