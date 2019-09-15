<template>

    <div class="sticky">

        <header-menu />

        <div class="header">

            <router-link to="/">
                <img src="/public/assets/catcafe-logo.png" class="logo">
                <span class="header-heading logoText">catcafé</span>
            </router-link>

            <div class="headerRight">

                <router-link class="menuButton" to="/add-channel">
                    <span>Create channel</span>
                </router-link>

                <router-link to="/login">
                    <span>Login</span>
                </router-link>

                <router-link to="/signup">
                    <span>Signup</span>
                </router-link>

            </div>

        </div>


    </div>


</template>

<script>

import HeaderMenu from "./header-menu"

export default {

    components: {
        HeaderMenu,
    },

    methods: {}

}

</script>

<style>

</style>