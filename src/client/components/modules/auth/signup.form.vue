<template>

    <form class="form" action="#" >

        <label for="fusername">Username</label>
        <input type="text" id="fusername" name="username" v-model="username">

        <label for="femail">Email</label>
        <input type="text" id="femail" name="email" v-model="email">

        <label for="fpassword">Password</label>
        <input type="text" id="fpassword" name="password" v-model="password">

        <captcha ref="captcha" @submit="submit" buttonText="Signup"/>

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