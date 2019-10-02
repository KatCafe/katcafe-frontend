import Vuex from 'vuex'

import actions from './global-actions'
import mutations from './global-mutations'

export default {
    state:  {

        showStickyRightSidebarComment: false,
        topicStickyRightSidebarComment: '',
        channelStickyRightSidebarComment: '',

        layoutLoading: false,

        vueApp: null,

    },
    actions,
    mutations,
}