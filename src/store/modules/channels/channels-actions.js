import NetworkHelper from "modules/network/network-helper"

export default {

    CHANNEL_LIST_NAV_BAR_GET: async  ({ commit, dispatch, state }, { country }) => {

        const out = await dispatch('CHANNEL_LIST_GET', {country});

        if (out)
            return commit('SET_CHANNEL_LIST', out );

        commit('SET_CHANNEL_LIST', [] );

    },

    CHANNEL_LIST_GET: async  ({ commit, dispatch, state }, { country, index, count }) => {

        try{

            if (!index) index = 1;
            if (!count) count = 20;

            const out = await NetworkHelper.get(`/channels/top/${country}/${index}/${count}`);

            if (out && out.result)
                return out.channels;

        }catch(err){
            //console.error(err);
        }

    },

    CHANNEL_GET: async  ({ commit, dispatch, state }, { slug }) => {

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