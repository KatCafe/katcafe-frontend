<template>

    <div class="captchaBox" v-if="captcha">
        <div v-html="captcha.data"></div>
        <input  type="text" id="lcaptcha" name="captcha" :placeholder="$t('captcha.captcha')" v-model="captchaInput" maxlength="4" >
        <loading-button :text="buttonText || $t('captcha.post')" @onClick="submit" />
    </div>

</template>

<script>

import LoadingButton from 'client/components/UI/elements/loading-button'

export default {

    components: {LoadingButton},

    props:{
        buttonText: {
            default: '',
        }
    },

    data(){
        return {
            captchaInput: '',
        }
    },

    computed: {

        captcha() {
            return this.$store.state.captcha.captcha;
        },

    },

    mounted(){

        if (typeof window === "undefined") return;

        if (!this.captcha)
            this.$store.dispatch('CAPTCHA_GET', {});

        this.captchaInput = this.$store.state.captcha.captchaUserInput;
    },

    methods:{

        reset(){
            this.$store.dispatch('CAPTCHA_GET', {});
            this.captchaInput = '';
        },

        submit(e, resolve){

            this.$emit('submit', resolve, this.captchaData() );
        },

        captchaData(){
            return {
                solution: this.captchaInput,
                encryption: this.captcha.encryption,
            }
        },

        processError(error){

            if (error.indexOf("Captcha was already used") >= 0) {
                this.reset();
                error = error.replace("Captcha was already used", this.$i18n.t('captcha.errorAlreadyUsed'));
            }

            if (error.indexOf("Captcha is incorrect") >= 0 ){
                this.reset();
                error = error.replace("Captcha is incorrect", this.$i18n.t('captcha.errorIncorrect'));
            }

            return error;
        }

    },

    watch: {
        captchaInput: function (newValue, oldValue) {
            this.$store.dispatch('CAPTCHA_STORE_USER_INPUT', newValue);
        },
    }

}
</script>
