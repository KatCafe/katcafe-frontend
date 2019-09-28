import BrowserHelper from "modules/helpers/browser.helpers"

export default {

    CONTENT_INIT: async  ({ commit, dispatch, state }, { route, country, searchQuery = 'channel' }) => {

        let path = BrowserHelper.trimSlash(route.path);
        if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex'));

        path = path !== '' ? path : country;

        commit('SET_CONTENT_DISPLAY', 'topics' );

        commit('SET_CONTENT_SETTINGS_INIT', {contentDisplay: 'topics', settings: {

            pageIndex: route.params.pageIndex ? route.params.pageIndex -1 : 0,
            pageCount: route.params.pageCount ? route.params.pageCount : 5,
            pageMore: true,
            searchQuery,
            searchAlgorithm:'hot',
            search: path,
            searchRevert: false

        } });

        commit('SET_CONTENT_SETTINGS_INIT', {contentDisplay: 'comments', settings: {

                pageIndex: route.params.pageIndex ? route.params.pageIndex -1 : 0,
                pageCount: route.params.pageCount ? route.params.pageCount : 5,
                pageMore: true,
                searchQuery,
                searchAlgorithm:'hot',
                search: path,
                searchRevert: false

            } });


        commit('SET_TOPICS', [] );
        commit('SET_COMMENTS', [] );

        return dispatch('CONTENT_RESET', {});
    },

    CONTENT_RESET: async  ({ commit, dispatch, state }, {  }) => {

        const contentDisplay = state.contentDisplay;

        commit('SET_CONTENT_FROM_INIT', {contentDisplay, });

        commit('SET_TOPICS', [] );
        commit('SET_COMMENTS', [] );

        return dispatch('CONTENT_GET', {});

    },

    CONTENT_GET: async  ({ commit, dispatch, state }, {  }) => {

        try{

            const contentDisplay = state.contentDisplay;

            commit('SET_GLOBAL_LAYOUT_LOADING', true);

            await dispatch('CHANNEL_GET', {slug: state[contentDisplay+'Search'] });

            const out = await dispatch( contentDisplay === 'topics' ? 'TOPICS_GET' : 'COMMENTS_GET', {
                searchRevert: state[contentDisplay+'SearchRevert'],
                searchQuery: state[contentDisplay+'SearchQuery'],
                search: state[contentDisplay+'Search'],
                index: state[contentDisplay+'PageIndex'],
                count: state[contentDisplay+'PageCount']
            });

            commit('SET_CONTENT_PAGE_INFO', { contentDisplay, pageIndex: state[contentDisplay+'PageIndex']+1, pageCount: state[contentDisplay+'PageCount'], pageMore: out && out.length});


            commit('SET_GLOBAL_LAYOUT_LOADING', false);


        }catch(err){
            console.error('raised an error', err);
        }

    },

    CONTENT_CHANGE_DISPLAY: async ({commit, dispatch, state}, contentDisplay) =>{

        commit('SET_CONTENT_DISPLAY', contentDisplay)

        return dispatch('CONTENT_RESET', {  })

    },


}