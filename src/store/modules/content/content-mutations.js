import Vue from 'vue'

export default {

    SET_CONTENT_DISPLAY: (state, value ) => {
        state.contentDisplay = value;
    },

    SET_CONTENT_PAGE_INFO: (state, {contentDisplay, pageIndex, pageCount, pageMore} ) => {

        contentDisplay = contentDisplay || state.contentDisplay;

        state[ contentDisplay+'PageIndex' ] = pageIndex;
        state[ contentDisplay+'PageCount' ] = pageCount;
        state[ contentDisplay+'PageMore' ] = pageMore;

    },

    SET_CONTENT_SEARCH_QUERY: (state, { contentDisplay, searchRevert, searchQuery, searchAlgorithm, search })=>{

        contentDisplay = contentDisplay || state.contentDisplay;

        state[ contentDisplay+'SearchRevert' ] = searchRevert;
        state[ contentDisplay+'SearchQuery' ] = searchQuery;
        state[ contentDisplay+'SearchAlgorithm' ] = searchAlgorithm;
        state[ contentDisplay+'Search' ] = search;

    },

}
