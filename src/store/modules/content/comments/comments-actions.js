export default {

    COMMENTS_GET: async function ({ commit, dispatch, state }, { searchRevert = true, searchAlgorithm = 'hot', searchQuery = 'country', search, index = 0, count = 20 }) {

        index++;

        try{

            const out = await this.$app.networkHelper.post(`/comments/top`, {
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

                return out.comments;
            }

        }catch(err){
            console.error(err);
        }

        commit('SET_COMMENTS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: false });

        return [];
    },

    COMMENT_DELETE: async function ({commit, dispatch, state}, comment ) {

        if ( !confirm('Are you sure you want to delete comment: '+comment.body) )
            return;

        const out = await this.$app.networkHelper.post('/comments/delete/', { slug: comment.slug } );

        if (out)
            commit('SET_COMMENTS_DELETE', [comment.slug]);

    },

}