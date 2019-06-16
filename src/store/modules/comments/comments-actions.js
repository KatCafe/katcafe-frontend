import NetworkHelper from "modules/network/network-helper"

export default {

    COMMENTS_GET: async  ({ commit, dispatch, state }, { searchRevert = true, searchAlgorithm = 'hot', searchQuery = 'country', search, index = 1, count = 20 }) => {

        try{

            const out = await NetworkHelper.post(`/comments/top`, {
                searchRevert,
                searchAlgorithm,
                searchQuery,
                search,
                index,
                count,
            });

            if (out && out.result)
                return commit('SET_COMMENTS', out.comments );

        }catch(err){
        }

        return commit('SET_COMMENTS', [] );

    },

}