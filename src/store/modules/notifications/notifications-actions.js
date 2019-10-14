
export default {

    NOTIFICATIONS_INITIALIZE: function  ({ commit, dispatch, state }, { enableInterval } ) {

        if (state.initialized) return;

        dispatch('NOTIFICATIONS_GET_COUNT', { enableInterval });

    },

    NOTIFICATIONS_GET_COUNT: async function ({commit, dispatch, state}, {enableInterval}) {

        if (enableInterval)
            commit('SET_NOTIFICATIONS_INITIALIZED', true);

        try{

            const res = await this.$app.networkHelper.get( '/notifications/get-unread-count-notifications', );

            if (res)
                commit('SET_NOTIFICATIONS_UNREAD_COUNT', res.unreadCount );

        }catch(err){
            console.error(err);
        }


        if (enableInterval)
            setTimeout( () => dispatch('NOTIFICATIONS_GET_COUNT', {enableInterval: false }), 10000 );


    },

    NOTIFICATIONS_CLEAR_COUNT: async function ({commit, dispatch, state}, ) {

        try{

            const res = await this.$app.networkHelper.get( '/notifications/clear-unread-notifications', );

            if (res)
                commit('SET_NOTIFICATIONS_UNREAD_COUNT', res.unreadCount );

        }catch(err){

        }

    },

}