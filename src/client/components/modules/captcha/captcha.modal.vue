<template>

    <div>
        <modal ref="modal">
            <div slot="content"  >
                <span>{{$t('captcha.modalText')}}</span>
                <captcha style="margin-top: 10px" @submit="captchaSubmit" ref="refCaptcha" />
                <span class="error-text">{{error}}</span>
            </div>
        </modal>
    </div>

</template>

<script>

import Modal from "client/components/UI/modal/modal"
import Captcha from "./captcha";

export default {

    components: {Captcha, Modal},

    data(){
        return {
            onSubmit: null,
            error: '',
        };
    },

    computed: {
        captchaInput(){
            return this.$store.state.captcha.captchaUserInput;
        }
    },

    methods: {

        showModal(onSubmit, captchaForm ){
            this.onSubmit = onSubmit;
            this.error = '';

            this.$refs['modal'].showModal(undefined, captchaForm);
        },

        closeModal(){
            this.$refs['modal'].closeModal();
        },

        captchaSubmit(resolve, captcha ){
            this.onSubmit( resolve, captcha, this.$refs['modal'].$refs['refForm'] );
        },

        reset(){
            this.$refs['refCaptcha'].reset();
        },

        processError(error){

            let isError;

            if (error.indexOf("Captcha was already used") >= 0 || error.indexOf("Captcha is incorrect") >= 0)
                isError = true;

            error = this.$refs['refCaptcha'].processError(error);

            if (isError) {
                this.error = error;
                return '';
            }

            return error;

        }

    }

}
</script>

<style>

</style>