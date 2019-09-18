<template>

    <div class="sticky">

        <header-menu />

        <div class="header">

            <router-link to="/">
                <img :src="logo.image" class="logo">
                <span class="header-heading logoText">{{logo.name}}</span>
            </router-link>

            <div class="headerRight">

                <router-link class="menuButton" to="/add-channel">
                    Add channel
                </router-link>

                <template v-if="!user">

                    <router-link to="/login">
                        Login
                    </router-link>

                    <router-link to="/signup" class="hiddenMobile">
                        Signup
                    </router-link>

                </template>

                <template v-else>
                    <router-link to="/logout" @click.native.prevent.capture="logout">
                        Logout <span class="hiddenMobile">{{user.username}}</span>
                    </router-link>
                </template>

            </div>

        </div>


    </div>


</template>

<script>

import HeaderMenu from "./header-menu"
import consts from "consts/consts"

export default {

    components: {
        HeaderMenu,
    },

    computed: {

        user(){
            return this.$store.state.auth.user;
        },

        logo(){
            return {
                name: consts.name,
                image: consts.logo,
            }
        }

    },

    methods: {

        logout(){

            return this.$store.dispatch('AUTH_LOGOUT');

        }

    },

}

</script>

<style>

</style>