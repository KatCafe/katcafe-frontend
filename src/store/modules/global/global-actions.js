export default {

    GLOBAL_SET_INITIALIZED: function ({ commit, dispatch, state },  ) {

        commit('SET_GLOBAL_INITIALIZED', true);

    },

    GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT: function ({ commit, dispatch, state }, { show = true, topic, channel } ) {

        commit('SET_GLOBAL_STICKY_RIGHT_SIDEBAR_COMMENT', {show, topic, channel});


    },

    GLOBAL_HIDE_STICKY_RIGHT_SIDEBAR_COMMENT: function ({ commit, dispatch, state },  ) {

        commit('SET_GLOBAL_STICKY_RIGHT_SIDEBAR_COMMENT', { show: false });


    },



}