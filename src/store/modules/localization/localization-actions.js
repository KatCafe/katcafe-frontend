import CookiesService from "src/services/cookies/cookies.service"

export default {
    // ensure data for rendering given list type

    LOCALIZATION_STORE_SELECTED: async function  ({ commit, dispatch, state }, {selectedCountry, selectedCountryCode} ) {

        commit('SET_LOCALIZATION_SELECTED_COUNTRY', {selectedCountry, selectedCountryCode});

        if (typeof window !==  "undefined") {
            CookiesService.setCookie('selectedCountry', selectedCountry);
            CookiesService.setCookie('selectedCountryCode', selectedCountryCode);
        }

    },

    LOCALIZATION_NEW_IP: async function ({ commit, dispatch, state }, ip ) {

        return commit("SET_LOCALIZATION_IP", ip);

    },

    LOCALIZATION_FETCH: async function ({ commit, dispatch, state }, ip ) {


        if ( state.request.done && !state.request.error )
            return;

        if (!ip) ip = state.ip || '';

        ip = ip.replace("::ffff:", '');
        ip = ip.replace('127.0.0.1','');

        try {

            const res = await this.$app.httpHelper.get("https://geoip-db.com/json/" + ip, undefined,  '', undefined,false);

            const payload = {
                country: res.country_name || '',
                countryCode: res.country_code || '',
                city: res.city || '',
                latitude: res.latitude || '',
                longitude: res.longitude || '',
                clientIP: res.ip || '',
                timeZone: res.time_zone || '',
                request: {
                    sent: true,
                    done: true,
                    error: false,
                },
            };

            commit('SET_LOCALIZATION_DATA', payload );

            if (!state.selectedCountryCode)
                commit('SET_LOCALIZATION_SELECTED_COUNTRY', { selectedCountryCode: payload.countryCode, selectedCountry:payload.country } );

        }
        catch(ex){

            console.error("Geo IP rejected ",ex.toString());

            commit('SET_LOCALIZATION_REQUEST_ERROR',{});

            if (!state.selectedCountryCode)
                commit('SET_LOCALIZATION_SELECTED_COUNTRY', { selectedCountryCode: 'us', selectedCountry: 'United States' } );

        }

    },

}