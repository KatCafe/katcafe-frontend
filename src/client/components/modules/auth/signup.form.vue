<template>

    <form class="form" action="#" >

        <label for="fusername">Username</label>
        <input type="text" id="fusername" name="username" v-model="username">

        <label for="femail">Email</label>
        <input type="text" id="femail" name="email" v-model="email">

        <label for="fpassword">Password</label>
        <input type="password" id="fpassword" name="password" v-model="password">

        <label for="fconfirmpassword">Confirm Password</label>
        <input type="password" id="fconfirmpassword" name="confirmpassword" v-model="confirmPassword">

        <captcha ref="captcha" @submit="signup" buttonText="Signup"/>

        <span class="errorText">{{error}}</span>

        <span>
            You have an account ? <router-link to="/login">Log in now! </router-link>
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

            username: '',
            email: '',
            password: '',
            confirmPassword: '',

            error: '',
        }
    },

    computed: {

        defaultCountry(){
            return this.$store.state.localization.selectedCountryCode;
        }

    },

    methods: {

        async signup(e, resolver){

            const captcha = this.$refs['captcha'];

            this.error = '';

            try{

                const out = await NetworkHelper.post('/auth/signup', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    country: this.defaultCountry,
                    captcha: captcha.captchaData()
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