import NetworkHelper from "modules/network/network-helper"

export default {

    TOPICS_GET: async  ({ commit, dispatch, state }, { searchAlgorithm = 'hot', searchQuery = 'country', search, index = 0, count = 20 }) => {

        if (state.pageLoading) return;
        commit('SET_TOPICS_PAGE_LOADING', true);

        index++;

        try{

            const out = await NetworkHelper.post(`/topics/top`, {
                searchQuery,
                search,
                index,
                count,
            });

            if (out && out.result) {
                commit('ADD_TOPICS', out.topics);
                commit('SET_COMMENTS', out.comments);
                commit('SET_TOPICS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: out.comments.length >= count });
                commit('SET_TOPICS_PAGE_LOADING', false);
                return out;
            }

        }catch(err){
        }

        commit('SET_TOPICS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: false });
        commit('SET_TOPICS_PAGE_LOADING', false);

    },

    TOPIC_GET: async  ({ commit, dispatch, state }, { slug }) => {

        try{

            const out = await NetworkHelper.get(`/topics/get/${slug}`);

            if (out && out.result)
                return commit('SET_TOPIC', out.topic);

        }catch(err){
        }

        return commit('SET_TOPIC', undefined);

    },

}