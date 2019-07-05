<template>

    <div class="captchaBox" v-if="captcha">
        <div v-html="captcha.data"></div>
        <input style="width: 100px" type="text" id="lcaptcha" name="captcha" placeholder="Captcha" v-model="captchaInput"  >
        <input type="button" :value="buttonText" @click="submit">
    </div>

</template>

<script>
export default {

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

        submit(){
            this.$emit('submit');
        },

    },

}
</script>

<style>

</style>