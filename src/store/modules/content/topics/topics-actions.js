import StringHelper from "src/utils/string-helper"

export default {

    TOPICS_GET: async  function ({ commit, dispatch, state }, { searchAlgorithm = 'hot', searchQuery = 'country', searchRevert = false, search, index = 0, count = 20 }) {

        try{

            const out = await this.$app.networkHelper.post(`/topics/top`, {
                searchAlgorithm,
                searchRevert,
                searchQuery,
                search,
                index: index+1,
                count,
            });

            if (out ) {

                out.topics.map( topic => {

                    const comments = out.comments.filter( comment => comment.topic === topic.slug );
                    topic.commentsPageInfo = {
                        pageIndex: 1,
                        count: comments.length,
                    };

                } );

                commit('ADD_TOPICS', out.topics);
                commit('ADD_COMMENTS', out.comments);

                return out.topics;
            }

        }catch(err){
            console.error(err);
        }

        return [];
    },

    TOPIC_GET: async function ({ commit, dispatch, state }, { slug }) {

        try{

            slug = StringHelper.trimSlashes(slug);

            let topic = state.map[slug];

            if (!topic) {
                const out = await this.$app.networkHelper.post(`/topics/get`, {slug});

                if (out)
                    topic = out.topic;
            }

            return commit('SET_TOPIC', topic);

        }catch(err){
            console.error("Error getting topic", slug);
        }

        return commit('SET_TOPIC', null);

    },

    TOPIC_GET_MORE_COMMENTS: async  function ({ commit, dispatch, state }, { slug, searchRevert = false, searchAlgorithm = 'hot', searchQuery = 'topic' }) {

        try{

            slug = StringHelper.trimSlashes(slug);

            let topic = state.map[slug];
            if (!topic) throw "topic was not found"

            console.log(topic);

            const out = await this.$app.networkHelper.post(`/comments/top`, { search: slug, searchRevert, searchAlgorithm, searchQuery, index: topic.commentsPageInfo.pageIndex+1, count: topic.commentsPageInfo.count });

            if (out )
                if (out.comments.length) {
                    commit('ADD_COMMENTS', out.comments);
                    topic.commentsPageInfo.pageIndex += 1;
                }

        }catch(err){
            console.error("Error getting more comments for topic ", slug);
        }

        return commit('SET_TOPIC', undefined);

    },

    TOPIC_DELETE: async function ( {commit, dispatch, state}, topic ) {

        if (!confirm('Are you sure you want to delete topic: '+topic.slug))
            return;

        const out = await this.$app.networkHelper.post('/topics/delete/', { slug: topic.slug } );

        if (out)
            commit('SET_TOPICS_DELETE', [topic.slug]);

    },


}