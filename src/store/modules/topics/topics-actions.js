import NetworkHelper from "modules/network/network-helper"

export default {

    TOPICS_GET: async  ({ commit, dispatch, state }, { searchQuery = 'country', search, index = 1, count = 20 }) => {

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
            //console.error(err);
        }

        return commit('SET_TOPICS', [] );

    },

    TOPIC_GET: async  ({ commit, dispatch, state }, { slug }) => {

        try{

            const out = await NetworkHelper.get(`/channels/get/${slug}`);

            if (out && out.result)
                return commit('SET_CHANNEL', out.channel);

        }catch(err){
            //console.error(err);
        }

        return commit('SET_CHANNEL', undefined);

    },

}