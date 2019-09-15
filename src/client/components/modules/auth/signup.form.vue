<template>

    <form class="form" action="#" >

        <label for="femail">Email</label>
        <input type="text" id="femail" name="email" v-model="email">

        <label for="fpassword">Password</label>
        <input type="text" id="fpassword" name="password" v-model="password">

        <captcha ref="captcha" @submit="submit" buttonText="Signup"/>

        <span class="errorText">{{error}}</span>

        <span>
            You have an account ? Log in now!
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