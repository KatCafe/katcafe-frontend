import Vuex from 'vuex'

import actions from './topics-actions'
import mutations from './topics-mutations'

export default {
    state:  {

        topic: null,
        list: [''],

    },
    actions,
    mutations,
}