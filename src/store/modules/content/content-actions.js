import BrowserHelper from "modules/helpers/browser.helpers"

export default {

    CONTENT_GET: async  ({ commit, dispatch, state }, {  }) => {

        try{

            const contentDisplay = state.contentDisplay;

            commit('SET_GLOBAL_LAYOUT_LOADING', true);

            await dispatch('CHANNEL_GET', {slug: state[contentDisplay+'Search'] });

            await dispatch( contentDisplay === 'topics' ? 'TOPICS_GET' : 'COMMENTS_GET', {
                searchRevert: state[contentDisplay+'SearchRevert'],
                searchQuery: state[contentDisplay+'SearchQuery'],
                search: state[contentDisplay+'Search'],
                index: state[contentDisplay+'PageIndex'],
                count: state[contentDisplay+'PageCount']
            });

            commit('SET_GLOBAL_LAYOUT_LOADING', false);


        }catch(err){
            console.error('home page raised an error', path);
        }

    },

    CONTENT_CHANGE_DISPLAY: ({commit, dispatch, state}, contentDisplay) =>{

        commit('SET_CONTENT_DISPLAY', contentDisplay)

    },


}