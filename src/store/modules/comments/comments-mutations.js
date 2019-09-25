import Vue from 'vue'

export default {


    SET_COMMENTS:  (state, comments ) => {

        state.map = {};

        for (const comment of comments)
            Vue.set( state.map, comment.slug, comment );


    },

    ADD_COMMENTS: (state, comments)=>{

        for (const comment of comments)
            Vue.set( state.map, comment.slug, comment );

    },

    SET_COMMENTS_PAGE_LOADING: (state, pageLoading ) => {

        state.pageLoading = pageLoading;

    },

    SET_COMMENTS_PAGE_INFO: (state, {pageIndex, pageCount, pageMore} ) => {

        state.pageIndex = pageIndex;
        state.pageCount = pageCount;
        state.pageMore = pageMore;

    },

    SET_COMMENTS_DELETE: ( state, ids ) => {

        ids.map(it => Vue.delete( state.map, it ));

    }

}