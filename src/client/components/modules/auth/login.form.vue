<template>

    <form class="form" action="#" >

        <label for="femail">Login/Email</label>
        <input type="text" id="femail" name="email" v-model="userEmail">

        <label for="fpassword">Password</label>
        <input type="password" id="fpassword" name="password" v-model="password">

        <captcha ref="captcha" @submit="login" buttonText="Login"/>

        <span class="errorText">{{error}}</span>

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

        async login(e, resolver){

            const captcha = this.$refs['captcha'];

            this.error = '';

            try{

                const out = await NetworkHelper.post('/auth/signin', {
                    userEmail: this.userEmail,
                    password: this.password,
                    country: this.defaultCountry,
                    captcha: captcha.captchaData(),
                });

                if (out && out.user){
                    this.$router.push('/');
                }

            }catch(err){
                this.error = err.message;

                if (this.error.indexOf("Captcha was already used") >= 0 || this.error.indexOf("Captcha is incorrect") >= 0 )
                    captcha.reset();
            }

            resolver();

        }

    },

}
</script>

<style>

</style>