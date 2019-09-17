<template>

    <div class="captchaBox" v-if="captcha">
        <div v-html="captcha.data"></div>
        <input  type="text" id="lcaptcha" name="captcha" placeholder="Captcha" v-model="captchaInput"  >
        <loading-button :text="buttonText" @onClick="submit" />
    </div>

</template>

<script>

import LoadingButton from 'client/components/UI/elements/loading-button'

export default {

    components: {LoadingButton},

    props:{
        buttonText: {
            default: 'Submit',
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

    },

    methods:{

        reset(){
            this.$store.dispatch('CAPTCHA_GET', {});
            this.captchaInput = '';
        },

        submit(e, resolve){

            this.$emit('submit', e, resolve);
        },

        captchaData(){
            return {
                solution: this.captchaInput,
                encryption: this.captcha.encryption,
            }
        }

    },

}
</script>

<style>

</style>