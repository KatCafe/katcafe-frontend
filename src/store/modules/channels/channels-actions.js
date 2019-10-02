export default {

    CHANNEL_LIST_NAV_BAR_GET: async function ({ commit, dispatch, state }, { country }) {

        if (state.navBarListCountry === country) return;
        commit('SET_CHANNEL_NAV_BAR_LIST_COUNTRY', country );

        const out = await dispatch('CHANNEL_LIST_GET', {country});

        if (out)
            return commit('SET_CHANNEL_NAV_BAR_LIST', out );

        commit('SET_CHANNEL_NAV_BAR_LIST', [] );

    },

    CHANNEL_LIST_GET: async function ({ commit, dispatch, state }, { algorithm ='hot', country, index = 1, count = 20 }) {

        try{

            const out = await this.$app.networkHelper.get(`/channels/${algorithm}/${country}/${index}/${count}`);

            if (out)
                return out.channels;

        }catch(err){
        }

    },

    CHANNEL_GET: async  function ({ commit, dispatch, state }, { slug }) {

        try{

            const out = await this.$app.networkHelper.get(`/channels/get/${slug}`);

            if (out )
                return commit('SET_CHANNEL', out.channel);

        }catch(err){
            console.error(err);
        }

        return commit('SET_CHANNEL', null);

    },

}