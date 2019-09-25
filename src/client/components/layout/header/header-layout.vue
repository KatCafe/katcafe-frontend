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
                    {{$t('header.addChannel')}}
                </router-link>

                <template v-if="!user">

                    <router-link to="/login">
                        {{$t('header.login')}}
                    </router-link>

                    <router-link to="/signup" class="hiddenMobile">
                        {{$t('header.signup')}}
                    </router-link>

                </template>

                <template v-else>
                    <router-link to="/logout" @click.native.prevent.capture="logout">
                        {{$t('header.logout')}} <span class="hiddenMobile">{{user.username}}</span>
                    </router-link>

                    <template v-if="isAdmin">
                        <router-link to="/admin">
                            {{$t('header.admin')}}
                        </router-link>
                    </template>

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

        isAdmin(){
            return this.$store.getters.isUserAdmin();
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
