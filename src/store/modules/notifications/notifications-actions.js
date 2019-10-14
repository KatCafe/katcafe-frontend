
export default {

    NOTIFICATIONS_GET: async function ({ commit, dispatch, state }, { searchRevert = true, searchAlgorithm = '', searchQuery = '', search, index = 0, count = 20 }) {

        index++;

        try{

            const out = await this.$app.networkHelper.post(`/notifications/top`, {
                searchRevert,
                searchAlgorithm,
                searchQuery,
                search,
                index,
                count,
            });

            if (out ) {
                console.log(out.notifications);

                commit('ADD_NOTIFICATIONS', out.notifications);
                commit('SET_NOTIFICATIONS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: out.notifications.length >= count });

                return out.notifications;
            }

        }catch(err){
            console.error(err);
        }

        commit('SET_NOTIFICATIONS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: false });

        return [];
    },

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

    NOTIFICATIONS_CLEAR_UNREAD_COUNT: async function ({commit, dispatch, state}, ) {

        try{

            const res = await this.$app.networkHelper.get( '/notifications/clear-unread-notifications', );

            if (res)
                commit('SET_NOTIFICATIONS_UNREAD_COUNT', res.unreadCount );

        }catch(err){
            console.error(err);
        }

    },

    NOTIFICATIONS_CLEAR: function ({commit, dispatch, state}){

        commit('SET_NOTIFICATIONS_PAGE_INFO', {pageIndex: 0, pageCount: 20, pageMore: true });
        commit('CLEAR_NOTIFICATIONS');

    },

}