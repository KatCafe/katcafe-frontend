import BrowserHelper from "modules/helpers/browser.helpers"

export default {

    CONTENT_INIT: async  function ({ commit, dispatch, state }, { route, country, searchQuery = 'channel' }) {

        let path = BrowserHelper.trimSlash(route.path);
        if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex'));

        path = path !== '' ? path : country;

        commit('SET_CONTENT_DISPLAY', 'topics' );

        commit('SET_CONTENT_SETTINGS_INIT', {contentDisplay: 'topics', settings: {

            pageIndex: route.params.pageIndex ? route.params.pageIndex -1 : 0,
            pageCount: route.params.pageCount ? route.params.pageCount : 10,
            pageMore: true,
            searchQuery,
            searchAlgorithm:'hot',
            search: path,
            searchRevert: false

        } });

        commit('SET_CONTENT_SETTINGS_INIT', {contentDisplay: 'comments', settings: {

                pageIndex: route.params.pageIndex ? route.params.pageIndex -1 : 0,
                pageCount: route.params.pageCount ? route.params.pageCount : 30,
                pageMore: true,
                searchQuery,
                searchAlgorithm:'date',
                search: path,
                searchRevert: false

            } });


        commit('SET_TOPICS', [] );
        commit('SET_COMMENTS', [] );

        return dispatch('CONTENT_RESET', {});
    },

    CONTENT_RESET: async function ({ commit, dispatch, state }, {  }) {

        const contentDisplay = state.contentDisplay;

        commit('SET_CONTENT_FROM_INIT', {contentDisplay, });

        commit('SET_TOPICS', [] );
        commit('SET_COMMENTS', [] );

        return dispatch('CONTENT_GET', {});

    },

    CONTENT_GET: async function ({ commit, dispatch, state }, {  }) {

        try{

            const contentDisplay = state.contentDisplay;
            const settings = state[contentDisplay+'Settings'];

            if (settings.loading) return settings.loadingPromise;

            let resolver;
            const promise = new Promise( resolve=>{
                resolver = resolve;
            });


            commit('SET_GLOBAL_LAYOUT_LOADING', true);
            commit('SET_CONTENT_LOADING', {contentDisplay, loading: true, promise});

            await dispatch('CHANNEL_GET', {slug: settings.search });

            console.log("settings.search", settings.search, settings.loading);


            //console.log(contentDisplay, settings );

            const out = await dispatch( contentDisplay === 'topics' ? 'TOPICS_GET' : 'COMMENTS_GET', {
                searchRevert: settings.searchRevert,
                searchQuery: settings.searchQuery,
                search: settings.search,
                index: settings.pageIndex,
                count: settings.pageCount
            });

            commit('SET_CONTENT_PAGE_INFO', { contentDisplay, pageIndex: settings.pageIndex+1, pageCount: settings.pageCount, pageMore: out && out.length === settings.pageCount });


            commit('SET_GLOBAL_LAYOUT_LOADING', false);
            commit('SET_CONTENT_LOADING', {contentDisplay, loading: false});


        }catch(err){
            console.error('raised an error', err);
        }

    },

    CONTENT_CHANGE_DISPLAY: async function ({commit, dispatch, state}, contentDisplay) {

        commit('SET_CONTENT_DISPLAY', contentDisplay)

        return dispatch('CONTENT_RESET', {  })

    },


}