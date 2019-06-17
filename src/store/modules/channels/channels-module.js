import Vuex from 'vuex'

import actions from './channels-actions'
import mutations from './channels-mutations'

export default {
    state:  {

        channel: null,

        navBarList: [''],
        navBarListCountry: '',

    },
    actions,
    mutations,
}