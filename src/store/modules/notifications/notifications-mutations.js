import Vue from "vue";

export default {

    ADD_NOTIFICATIONS: (state, list )=>{

        for (const it of list)
            Vue.set( state.map, it.uuid, it );

        state.map = Object.assign({}, state.map );

    },

    CLEAR_NOTIFICATIONS: (state ) => {

        state.map = {};

    },

    SET_NOTIFICATIONS_UNREAD_COUNT: (state, unreadCount ) => {

        state.unreadCount = unreadCount;

    },

    SET_NOTIFICATIONS_INITIALIZED: (state, initialized ) => {

        state.initialized = initialized;

    },

    SET_NOTIFICATIONS_PAGE_INFO: (state, {pageIndex, pageCount, pageMore} ) => {

        state.pageIndex = pageIndex;
        state.pageCount = pageCount;
        state.pageMore = pageMore;

    },

    SET_NOTIFICATIONS_MARK_NOTIFICATION_READ: (state, {notificationId, value}) =>{

        const notification = state.map[notificationId];
        notification.unread = !value;

        Vue.set(state.map, notificationId, Object.assign({}, notification ));

    },


}