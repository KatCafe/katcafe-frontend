import CookiesService from "src/services/cookies/cookies.service"

export default {

    SET_AUTH_USER: (state, user ) => {

        state.user = user;

    },

    SET_AUTH_SESSION: (state, session ) => {

        state.session = session;

        if ( !session  )
            CookiesService.deleteCookie('session');
        else
            CookiesService.setCookie('session', JSON.stringify(session) );

    },

}