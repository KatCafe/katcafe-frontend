import Vuex from 'vuex'

import actions from './digital-signature-actions'
import mutations from './digital-signature-mutations'

export default {
    state:  {

        privateKey: null,
        publicKey: null,

    },
    actions,
    mutations,
}