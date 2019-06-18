export default {


    SET_TOPIC:  (state, topic ) => {
        state.topic = topic;
    },

    SET_TOPICS:  (state, topics ) => {

        state.list = topics;
        state.map = {};

        for (const topic of topics)
            state.map[topic.slug] = true;

    },

    ADD_TOPICS: (state, topics)=>{

        for (const topic of topics)
            if (!state.map[topic.slug]) {
                state.map[topic.slug] = true;
                state.list.push(topic);
            }

    },

    SET_TOPICS_PAGE_LOADING: (state, pageLoading ) => {

        state.pageLoading = pageLoading;

    },

    SET_TOPICS_PAGE_INFO: (state, {pageIndex, pageCount, pageMore} ) => {

        state.pageIndex = pageIndex;
        state.pageCount = pageCount;
        state.pageMore = pageMore;

    },

}