export default {
    // ensure data for rendering given list type

    AUTH_LOGIN: async function ({ commit, dispatch, state }, { userEmail, password, country, captcha } ) {

        const out = await this.$app.networkHelper.post('/auth/signin', {userEmail, password, country, captcha} );

        if (out && out.user) {
            commit('SET_AUTH_USER', out.user);
            commit('SET_AUTH_SESSION', out.session);

            await dispatch('NOTIFICATIONS_SUBSCRIBE', {});
        }

        dispatch('CAPTCHA_GET', );

        return out;
    },

    AUTH_SIGN_UP: async function ({ commit, dispatch, state }, { username, email, password, confirmPassword, country, captcha } ) {

        const out = await this.$app.networkHelper.post('/auth/signup', {username, email, password, confirmPassword, country, captcha} );

        if (out ){
            commit('SET_AUTH_USER', out.user);
            commit('SET_AUTH_SESSION', out.session);
        }

        dispatch('CAPTCHA_GET', );

        return out;
    },

    AUTH_LOGOUT: async function  ({ commit, dispatch, state },  ) {

        try{

            await dispatch('NOTIFICATIONS_UNSUBSCRIBE', undefined);

            const out = await this.$app.networkHelper.get('/auth/logout',  );

        }catch(err){
            console.error(err);
        }

        commit('SET_AUTH_USER', null );
        commit('SET_AUTH_SESSION', '' );

    },

    AUTH_LOGIN_SESSION: async function ( {commit, dispatch, state}, session = {} ) {

        const out = await this.$app.networkHelper.post('/auth/signin-session', {key: session.key || state.session.key} );

        if (out){
            commit('SET_AUTH_USER', out.user);
            commit('SET_AUTH_SESSION', out.session);
        }

    },

}