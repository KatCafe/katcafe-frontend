<template>

    <form class="form" action="#" >

        <label for="femail">Login/Email</label>
        <input type="text" id="femail" name="email" v-model="userEmail">

        <label for="fpassword">Password</label>
        <input type="password" id="fpassword" name="password" v-model="password">

        <captcha ref="captcha" @submit="login" buttonText="Login"/>

        <span class="error-text">{{error}}</span>

        <span>
            You don't have an account ? <router-link to="/signup"> Sign up now. </router-link>
        </span>

    </form>

</template>

<script>

import NetworkHelper from "modules/network/network-helper"
import Captcha from "client/components/modules/captcha/captcha"

export default {

    components: { Captcha },

    data(){
        return {
            userEmail: '',
            password: '',
            error: '',
        }
    },

    computed: {

        defaultCountry(){
            return this.$store.state.localization.selectedCountryCode;
        }

    },

    methods: {

        async login( resolver, captchaData){

            const captcha = this.$refs['captcha'];

            this.error = '';

            try{

                const out = await this.$store.dispatch('AUTH_LOGIN', {
                    userEmail: this.userEmail,
                    password: this.password,
                    country: this.defaultCountry,
                    captcha: captchaData,
                });

                if (out && out.user)
                    this.$router.push('/');


            }catch(err){

                this.error = captcha.processError(err.message);

            }

            resolver();

        }

    },

}
</script>
