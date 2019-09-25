import NetworkHelper from "modules/network/network-helper"
import StringHelper from "src/utils/string-helper"

export default {

    TOPICS_GET: async  ({ commit, dispatch, state }, { searchAlgorithm = 'hot', searchQuery = 'country', searchRevert = false, search, index = 0, count = 20 }) => {

        if (state.pageLoading) return;
        commit('SET_TOPICS_PAGE_LOADING', true);

        index++;

        try{

            const out = await NetworkHelper.post(`/topics/top`, {
                searchAlgorithm,
                searchRevert,
                searchQuery,
                search,
                index,
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
                commit('SET_TOPICS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: out.comments.length >= count });
                commit('SET_TOPICS_PAGE_LOADING', false);
                return out;
            }

        }catch(err){
        }

        commit('SET_TOPICS_PAGE_INFO', {pageIndex: index, pageCount: count, pageMore: false });
        commit('SET_TOPICS_PAGE_LOADING', false);

    },

    TOPIC_GET: async  ({ commit, dispatch, state }, { slug }) => {

        try{

            slug = StringHelper.trimSlashes(slug);

            let topic = state.map[slug];

            if (!topic) {
                const out = await NetworkHelper.get(`/topics/get/${slug}`);

                if (out)
                    topic = out.topic;
            }

            return commit('SET_TOPIC', topic);

        }catch(err){
            console.error("Error getting topic", err);
        }

        return commit('SET_TOPIC', null);

    },

    TOPIC_GET_MORE_COMMENTS: async  ({ commit, dispatch, state }, { slug, searchRevert = false, searchAlgorithm = 'hot', searchQuery = 'topic' }) => {

        try{

            slug = StringHelper.trimSlashes(slug);

            let topic = state.map[slug];
            if (!topic) throw "topic was not found"

            console.log(topic);

            const out = await NetworkHelper.post(`/comments/top`, { search: slug, searchRevert, searchAlgorithm, searchQuery, index: topic.commentsPageInfo.pageIndex+1, count: topic.commentsPageInfo.count });

            if (out )
                if (out.comments.length) {
                    commit('ADD_COMMENTS', out.comments);
                    topic.commentsPageInfo.pageIndex += 1;
                }

        }catch(err){
            console.error("Error getting topic", err);
        }

        return commit('SET_TOPIC', undefined);

    },

    TOPIC_DELETE: async ( {commit, dispatch, state}, slug ) => {

        const out = await NetworkHelper.post('/topics/delete/', { slug } );

        if (out)
            commit('SET_TOPICS_DELETE', [slug]);

    },


}