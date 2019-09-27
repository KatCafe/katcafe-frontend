import CookiesService from "../../../services/cookies/cookies.service";

export default {

    GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT: ({ commit, dispatch, state }, { show = true, topic, channel } ) => {

        commit('SET_GLOBAL_STICKY_RIGHT_SIDEBAR_COMMENT', {show, topic, channel});


    },

    GLOBAL_HIDE_STICKY_RIGHT_SIDEBAR_COMMENT: ({ commit, dispatch, state },  ) => {

        commit('SET_GLOBAL_STICKY_RIGHT_SIDEBAR_COMMENT', { show: false });


    },

    GLOBAL_CHANGE_CONTENT_DISPLAY: ({commit, dispatch, state}, contentDisplay) =>{

        commit('SET_GLOBAL_CONTENT_DISPLAY', contentDisplay)

    },


}