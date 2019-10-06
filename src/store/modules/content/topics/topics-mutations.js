import Vue from "vue";

export default {


    SET_TOPIC:  (state, topic ) => {
        state.topic = topic;
        return topic;
    },

    SET_TOPICS:  (state, topics ) => {

        const map = {};

        for (const topic of topics)
            map[topic.slug] = topic;

        state.map = map;
    },

    ADD_TOPICS: (state, topics)=>{

        for (const topic of topics)
            if ( !state.map[topic.slug] )
                Vue.set( state.map, topic.slug, topic);

        state.map = Object.assign({}, state.map );
    },


    SET_TOPICS_DELETE: ( state, ids ) => {

        ids.map(it => Vue.delete( state.map, it ));

    }


}