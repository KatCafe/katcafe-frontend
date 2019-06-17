export default {


    SET_CHANNEL:  (state, channel ) => {
        state.channel = channel;
    },

    SET_CHANNEL_NAV_BAR_LIST:  (state,  navBarList    ) => {

        state.navBarList = navBarList;

    },

    SET_CHANNEL_NAV_BAR_LIST_COUNTRY: (state, navBarListCountry) => {

        state.navBarListCountry = navBarListCountry;

    },

}