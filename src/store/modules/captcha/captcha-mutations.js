import Vue from 'vue'

export default {

    SET_CAPTCHA:  (state, captcha ) => {
        state.captcha = captcha;
    },

    SET_CAPTCHA_LOADING:  (state, captchaLoading ) => {
        state.captchaLoading = captchaLoading;
    },

    SET_CAPTCHA_USER_INPUT: (state, userInput)=>{
        state.captchaUserInput = userInput;
    }
}
