<template>

    <div v-if="captcha">
        <label for="lcaptcha">Captcha</label>
        <div v-html="captcha.data"></div>
        <input style="width: 100px" type="text" id="lcaptcha" name="captcha" placeholder="Captcha" v-model="captchaInput"  >
    </div>

</template>

<script>
export default {

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
        }
    },

}
</script>

<style>

</style>