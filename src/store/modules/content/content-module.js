import Vuex from 'vuex'

import actions from './content-actions'
import mutations from './content-mutations'

export default {
    state:  {

        contentDisplay: 'topics',

        topicsPageIndex: 0,
        topicsPageCount: 20,
        topicsPageMore: true,
        topicsSearchRevert: false,
        topicsSearchQuery: 'country',
        topicsSearchAlgorithm: 'hot',
        topicsSearch: '',

        commentsPageIndex: 0,
        commentsPageCount: 20,
        commentsMore: true,
        commentsSearchRevert: false,
        commentsSearchQuery: 'country',
        commentsSearchAlgorithm: 'date',
        commentsSearch: '',
    },
    actions,
    mutations,
}