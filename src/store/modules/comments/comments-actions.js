import NetworkHelper from "modules/network/network-helper"

export default {

    COMMENTS_GET: async  ({ commit, dispatch, state }, { searchRevert = true, searchAlgorithm = 'hot', searchQuery = 'country', search, index = 0, count = 20 }) => {

        if (state.pageLoading) return;
        commit('SET_COMMENTS_PAGE_LOADING', true);

        index++;

        try{

            const out = await NetworkHelper.post(`/comments/top`, {
                searchRevert,
                searchAlgorithm,
                searchQuery,
                search,
                index,
                count,
            });

            console.log(out.comments.length, count, out.comments.length >= count)

            if (out && out.result) {
                commit('ADD_COMMENTS', out.comments);
                commit('SET_COMMENTS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: out.comments.length >= count });
                commit('SET_COMMENTS_PAGE_LOADING', false );

                console.log(state.pageMore);

                return;
            }

        }catch(err){
            console.error(err);
        }

        commit('SET_COMMENTS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: false });
        commit('SET_COMMENTS_PAGE_LOADING', false );

    },

}