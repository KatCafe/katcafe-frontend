import Vuex from 'vuex'

import actions from './content-actions'
import mutations from './content-mutations'

export default {
    state:  {

        contentDisplay: 'topics',

        topicsSettingsInit: {},
        topicsSettings: {
            pageIndex: 0,
            pageCount: 20,
            pageMore: true,
            searchRevert: true,
            searchQuery: 'country',
            searchAlgorithm: 'hot',
            search: '',
        },

        commentsSettingsInit: {},
        commentsSettings: {
            pageIndex: 0,
            pageCount: 20,
            pageMore: true,
            searchRevert: false,
            searchQuery: 'country',
            searchAlgorithm: 'date',
            search: '',
        },


    },
    actions,
    mutations,
}