import NetworkHelper from "modules/network/network-helper"

export default {

    COMMENTS_GET: async  ({ commit, dispatch, state }, { searchRevert = true, searchAlgorithm = 'hot', searchQuery = 'country', search, index = 0, count = 20 }) => {

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

            if (out ) {
                commit('ADD_COMMENTS', out.comments);
                commit('SET_COMMENTS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: out.comments.length >= count });

                return;
            }

        }catch(err){
            console.error(err);
        }

        commit('SET_COMMENTS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: false });

    },

    COMMENT_DELETE: async ({commit, dispatch, state}, slug ) => {

        const out = await NetworkHelper.post('/comments/delete/', { slug } );

        if (out)
            commit('SET_COMMENTS_DELETE', [slug]);

    },

}