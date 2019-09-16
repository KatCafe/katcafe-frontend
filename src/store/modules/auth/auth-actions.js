import NetworkHelper from "modules/network/network-helper"
import CookiesService from "src/services/cookies/cookies.service"

export default {
    // ensure data for rendering given list type

    AUTH_LOGIN: async ({ commit, dispatch, state }, { userEmail, password, country, captcha } ) => {

        const out = await NetworkHelper.post('/auth/signin', {userEmail, password, country, captcha} );

        if (out && out.user) {
            commit('SET_AUTH_USER', {user: out.user});
            commit('SET_AUTH_SESSION', {session: out.session});
        }

        return out;
    },

    AUTH_SIGN_UP: ({ commit, dispatch, state }, { } ) => {

    },

    AUTH_LOGOUT: ({ commit, dispatch, state }, { } ) => {

        return commit('SET_AUTH_SESSION', undefined );

    },

}