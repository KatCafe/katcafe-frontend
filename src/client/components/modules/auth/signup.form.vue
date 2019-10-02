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

        <span class="error-text">{{error}}</span>

        <span>
            You have an account ? <router-link to="/login">Log in now! </router-link>
        </span>

    </form>

</template>

<script>

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

        async signup(resolver, captchaData){

            const captcha = this.$refs['captcha'];

            this.error = '';

            try{

                const out = await this.$store.dispatch('AUTH_SIGN_UP', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    country: this.defaultCountry,
                    captcha: captchaData,
                });

                if (out && out.user){
                    this.$router.push('/');
                }

            }catch(err){
                this.error = captcha.processError(err.message)

                if (this.error.indexOf("Username already registered") >= 0) captcha.reset();
                if (this.error.indexOf("Email already registered") >= 0) captcha.reset();

            }

            resolver();
        }

    },

}
</script>
