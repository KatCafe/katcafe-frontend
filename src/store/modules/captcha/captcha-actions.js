import NetworkHelper from "modules/network/network-helper";

export default {

    CAPTCHA_GET: async  ({ commit, dispatch, state } ) => {

        if (state.captchaLoading) return;

        commit('SET_CAPTCHA_LOADING', true );

        try{

            const out = await NetworkHelper.get(`/captcha/get`, { });

            if (out ) {
                commit('SET_CAPTCHA', out.captcha);
                commit('SET_CAPTCHA_USER_INPUT', '');
                commit('SET_CAPTCHA_LOADING', false );

                return;
            }

        }catch(err){
            console.error("Catptcha error", err);
        }

        commit('SET_CAPTCHA', null );
        commit('SET_CAPTCHA_USER_INPUT', '');
        commit('SET_CAPTCHA_LOADING', false );

    },

    CAPTCHA_STORE_USER_INPUT: async ({commit, dispatch, state}, input ) => {

        commit('SET_CAPTCHA_USER_INPUT', input);

    },

}