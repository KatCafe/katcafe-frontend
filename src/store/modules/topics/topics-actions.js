import NetworkHelper from "modules/network/network-helper"

export default {

    TOPICS_GET: async  ({ commit, dispatch, state }, { searchAlgorithm = 'hot', searchQuery = 'country', search, index = 1, count = 20 }) => {

        try{

            const out = await NetworkHelper.post(`/topics/top`, {
                searchQuery,
                search,
                index,
                count,
            });

            if (out && out.result)
                return commit('SET_TOPICS', out.topics);

        }catch(err){
        }

        return commit('SET_TOPICS', [] );

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