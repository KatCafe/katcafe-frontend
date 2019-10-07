import Vue from 'vue'

export default {

    SET_GLOBAL_INITIALIZED: (state,  {show, topic, channel} ) => {

        state.initialized = true;

    },

    SET_GLOBAL_STICKY_RIGHT_SIDEBAR_COMMENT: (state,  {show, topic, channel} ) => {

        state.showStickyRightSidebarComment = show;

        if (topic) state.topicStickyRightSidebarComment = topic;
        if (channel) state.channelStickyRightSidebarComment = channel;

    },

    SET_GLOBAL_LAYOUT_LOADING: (state, value ) => {
        state.layoutLoading = value;
    },

}
