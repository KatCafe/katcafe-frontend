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

}