<template>

    <div class="captcha-box" >


        <div class="captcha">
            <icon icon="loading-spinner" v-if="!captcha || captchaLoading" class="fa-2x" />
            <template v-if="captcha && !captchaLoading">
                <div v-html="captcha ? captcha.data : '...'"></div>
                <icon icon="spinner" class="reload-captcha" @click="reset" />
            </template>
        </div>

        <input  type="text" id="lcaptcha" name="captcha" :placeholder="$t('captcha.captcha')" v-model="captchaInput" :maxlength="captcha ? captcha.size : 1" v-on:keyup.enter="submitForm" autocomplete="off" >
        <loading-button :text="buttonText || $t('captcha.post')" @submit="submit" ref="refLoadingButton" />

    </div>

</template>

<script>

import LoadingButton from 'client/components/UI/elements/loading-button'
import Icon from "client/components/UI/elements/icons/icon"

export default {

    components: {LoadingButton, Icon},

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

        captchaLoading(){
            return this.$store.state.captcha.captchaLoading;
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

        submit(resolve){
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
        },

        submitForm(e){
            this.$refs['refLoadingButton'].handleClick(e);
        }

    },

    watch: {
        captchaInput: function (newValue, oldValue) {
            this.$store.dispatch('CAPTCHA_STORE_USER_INPUT', newValue);
        },
    }

}
</script>

<style>

    .captcha-box{
        display: grid;
        grid-template-columns: 100px 100px 1fr;
        grid-column-gap: 10px;
        margin-bottom: 10px;
    }

    .captcha-box .captcha{
        position: relative;
        right: 0;
    }

    .captcha-box svg:first-child{
        width: auto;
        height: 35px;
    }

    .captcha-box .reload-captcha{
        position: absolute;
        left: 13px;
        top: 38px;
    }

    .captcha-box button{
        margin-top: 0;
    }

    @media only screen and (max-width: 600px) {
        .captcha-box {
            grid-template-columns: 90px 1fr 40px;
            grid-row-gap: 5px;
        }
    }

    @media only screen and (max-width: 300px) {
        .captcha-box {
            grid-template-columns: 90px 1fr ;
            grid-row-gap: 5px;
        }
    }

</style>
