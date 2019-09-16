import Vue from 'vue'

export default {


    SET_COMMENTS:  (state, comments ) => {

        state.list = comments;
        state.map = {};

        for (const comment of comments)
            state.map[comment.slug] = true


    },

    ADD_COMMENTS: (state, comments)=>{

        comments = comments.sort( (a,b ) => a.date - b.date );

        for (const comment of comments)
            if (!state.map[comment.slug]) {
                state.map[comment.slug] = true;
                state.list.push(comment);
            }


    },

    SET_COMMENTS_PAGE_LOADING: (state, pageLoading ) => {

        state.pageLoading = pageLoading;

    },

    SET_COMMENTS_PAGE_INFO: (state, {pageIndex, pageCount, pageMore} ) => {

        state.pageIndex = pageIndex;
        state.pageCount = pageCount;
        state.pageMore = pageMore;

    },

    SET_DELETE_COMMENTS: ( state, ids ) => {

        ids.map(it => Vue.delete( state.map, it ));
        ids.map(it => Vue.delete( state.list, state.list.findIndex( it2 => it2.slug === it ) ));



    }

}