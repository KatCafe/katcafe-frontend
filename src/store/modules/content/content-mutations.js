import Vue from 'vue'

export default {

    SET_CONTENT_SETTINGS_INIT: (state, { contentDisplay, settings })=>{

        contentDisplay = contentDisplay || state.contentDisplay;
        Vue.set(state,contentDisplay+'SettingsInit', settings || state[contentDisplay+'Settings']  );

    },

    SET_CONTENT_DISPLAY: (state, value ) => {
        state.contentDisplay = value;
    },

    SET_CONTENT_FROM_INIT: (state, {contentDisplay, settings} ) => {
        contentDisplay = contentDisplay || state.contentDisplay;
        Vue.set(state,contentDisplay+'Settings', settings || state[contentDisplay+'SettingsInit']  );
    },

    SET_CONTENT_PAGE_INFO: (state, {contentDisplay, pageIndex, pageCount, pageMore} ) => {

        contentDisplay = (contentDisplay || state.contentDisplay)+'Settings';

        Vue.set(state[contentDisplay],'pageIndex', pageIndex);
        Vue.set(state[contentDisplay],'pageCount', pageCount);
        Vue.set(state[contentDisplay],'pageMore', pageMore);

    },

    SET_CONTENT_SEARCH_QUERY: (state, { contentDisplay, searchRevert, searchQuery, searchAlgorithm, search })=>{

        contentDisplay = (contentDisplay || state.contentDisplay)+'Settings';

        Vue.set(state[contentDisplay],'searchRevert', searchRevert);
        Vue.set(state[contentDisplay],'searchQuery', searchQuery);
        Vue.set(state[contentDisplay],'searchAlgorithm', searchAlgorithm);
        Vue.set(state[contentDisplay],'search', search);

    },

}
