<template>

    <form class="form" action="#" >

        <label for="femail">Login/Email</label>
        <input type="text" id="femail" name="email" v-model="email">

        <label for="fpassword">Password</label>
        <input type="text" id="fpassword" name="password" v-model="password">

        <captcha ref="captcha" @submit="submit" buttonText="Login"/>

        <span class="errorText">{{error}}</span>

        <span>
            You don't have an account ? Sign up now.
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
            email: '',
            password: '',
            error: '',
        }
    },

    methods: {

        submit(){

        }

    },

}
</script>

<style>

</style>