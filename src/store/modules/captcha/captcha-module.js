import Vuex from 'vuex'

import actions from './captcha-actions'
import mutations from './captcha-mutations'

export default {
    state:  {

        captcha: null,
        captchaLoading: false,


    },
    actions,
    mutations,
}