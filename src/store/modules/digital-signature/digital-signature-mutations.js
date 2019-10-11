import Vue from 'vue'

export default {

    SET_DIGITAL_SIGNATURE_KEY_PAIRS: (state, {privateKey, publicKey}) => {

        Vue.set(state, 'privateKey', privateKey.toString("hex"));
        Vue.set(state, 'publicKey', publicKey.toString("hex"));

    },

}