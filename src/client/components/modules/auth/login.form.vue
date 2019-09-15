<template>

    <form class="form" action="#" >

        <label for="femail">Login</label>
        <input type="text" id="femail" name="email" v-model="email">

        <label for="fpassword">Password</label>
        <input type="text" id="fpassword" name="password" v-model="password">

        <captcha ref="captcha" @submit="createChannel"/>

        <span class="errorText">{{error}}</span>

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