import secp256k1 from "src/utils/secp256k1"

export default {

    DIGITAL_SIGNATURE_INIT: async function ({commit, dispatch, state} ) {

        let privateKey = localStorage.getItem('privateKey');
        if (privateKey)
            privateKey = Buffer.from(privateKey, "hex");

        if ( !privateKey || privateKey.length !== 32){

            privateKey = secp256k1.createPrivateKey();
            localStorage.setItem('privateKey', privateKey.toString("hex"));

        }

        const publicKey = secp256k1.createPublicKey(privateKey);

        commit('SET_DIGITAL_SIGNATURE_KEY_PAIRS', {privateKey, publicKey});

        console.log("found private key", privateKey.toString("hex"));
        console.log("found publicKey ", publicKey.toString("hex"));

    },

    DIGITAL_SIGNATURE_SIGN: function ({commit, dispatch, state}, message ) {

        return secp256k1.sign(message, Buffer.from( state.privateKey, "hex") );

    },

    DIGITAL_SIGNATURE_VERIFY: function ({commit, dispatch, state}, {message, signature} ){

        return secp256k1.verify(message, signature, Buffer.from( state.publicKey, "hex"))
    },

}