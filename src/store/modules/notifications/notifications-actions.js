
export default {

    NOTIFICATIONS_SUBSCRIBE: async function ({ commit, dispatch, state }, { subscription }) {

        if (!subscription){
            subscription = localStorage.getItem('notificationSubscription');
            if (subscription) subscription = JSON.parse(subscription);
        }
        if (!subscription) return;

        if (this.state.auth.user) subscription.user = this.state.auth.user.username;

        const signature = await dispatch('DIGITAL_SIGNATURE_SIGN', Buffer.from( JSON.stringify(subscription), "ascii") );

        await this.$app.networkHelper.post('/notifications-subscriptions/register-subscription', {
            subscription: subscription,
            signature: signature.toString("hex"),
        });

        localStorage.setItem('notificationSubscriptionSubscribed', 'true' )

    },

    NOTIFICATIONS_UNSUBSCRIBE: async function({commit, dispatch, state},  subscription){

        if (!subscription){
            subscription = localStorage.getItem('notificationSubscription');
            if (subscription) subscription = JSON.parse(subscription);
        }

        console.log("subscription", subscription);

        if (!subscription) return;

        await this.$app.networkHelper.post('/notifications-subscriptions/unsubscribe', {
            subscription: subscription,
        });

    },


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
            setTimeout( () => dispatch('NOTIFICATIONS_GET_COUNT', {enableInterval: true }), 10000 );


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

    NOTIFICATIONS_MARK_NOTIFICATION_READ: async function ({commit, dispatch, state}, {notificationId, value = true}){

        const notification = state.map[notificationId];
        if (!notification || notification.unread === !value) return;

        try{

            const out = await this.$app.networkHelper.post(`/notifications/mark-notification-read`, { id: notificationId, value  });

            commit('SET_NOTIFICATIONS_MARK_NOTIFICATION_READ', {notificationId, value})

        }catch(err){
            console.error(err);
        }

    },

}