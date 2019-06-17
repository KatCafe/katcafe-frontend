import Vue from 'vue'

export default {

    SET_GLOBAL_STICKY_RIGHT_SIDEBAR_COMMENT: (state,  {show, topic, channel} ) => {

        state.showStickyRightSidebarComment = show;
        state.topicStickyRightSidebarComment = topic;
        state.channelStickyRightSidebarComment = channel;

    },

}
