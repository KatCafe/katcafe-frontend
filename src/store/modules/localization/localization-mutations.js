export default {

    SET_LOCALIZATION_IP: (state, ip ) => {

        if (typeof ip === "string" && ip.lastIndexOf(":") > -1)
            ip = ip.substr(ip.lastIndexOf(":")+1);


        state.ip = ip;
    },

    SET_LOCALIZATION_DATA: (state,  payload ) => {
        state.country = payload.country;
        state.countryCode = payload.countryCode;
        state.city = payload.city;
        state.latitude = payload.latitude;
        state.longtitude = payload.longitude;
        state.timeZone = payload.timeZone;
        state.request = payload.request;
        state.clientIP = payload.clientIP;

        if (!state.selectedCountryCode) state.selectedCountryCode = payload.countryCode;
        if (!state.selectedCountry) state.selectedCountry = payload.country;

    },

    SET_LOCALIZATION_REQUEST_ERROR: (state, {}) => {
        state.request = {
            sent: true,
            done: false,
            error: true,
        };
    },

    SET_LOCALIZATION_SELECTED_COUNTRY: (state, {  selectedCountryCode, selectedCountry}) => {

        state.selectedCountryCode = selectedCountryCode;
        state.selectedCountry = selectedCountry;

    },

}