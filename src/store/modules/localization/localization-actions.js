const axios = require ('axios');

export default {
    // ensure data for rendering given list type

    LOCALIZATION_NEW_IP: ({ commit, dispatch, state }, ip ) => {

        return commit("SET_LOCALIZATION_IP", ip);

    },

    LOCALIZATION_FETCH: async ({ commit, dispatch, state }, ip ) => {

        if ( state.request.done && !state.request.error )
            return;

        if (!ip) ip = state.ip;

        ip = ip.replace("::ffff:", '');
        ip = ip.replace('127.0.0.1','');

        try {

            let res = await axios.get("https://geoip-db.com/json/" + ip);

            res = res.data;

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

            return commit('SET_LOCALIZATION_DATA', payload );
        }
        catch(Exception){

            console.log("Geo IP rejected ",Exception.toString());

            return commit('SET_LOCALIZATION_REQUEST_ERROR',{});
        };

    },

}