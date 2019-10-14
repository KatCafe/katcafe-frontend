<template>

    <div class="sticky">

        <header-menu />

        <div class="header">

            <router-link to="/">
                <img :src="logo.image" :alt="logo.name" class="logo">
                <span class="header-heading logo-text">{{logo.name}}</span>
            </router-link>

            <div class="header-right">

                <router-link to="/add-channel">
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

                <div class="bell-cover">
                    <span class="fa-stack has-badge" data-count="5">
                      <i class="fa fa-bell fa-stack-1x fa-inverse"></i>
                    </span>
                </div>

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


<style>

    .sticky{
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .header {
        background: var(--header-bg-color);
        border-bottom: solid 1px var(--header-border-color);

        padding: 2px 20px 0;
    }

    .header-heading {
        margin: 0;
    }

    .header .logo {
        height: 40px;
        display:inline-block;
        padding-right: 10px;
    }

    .header .logo-text{
        display:inline-block;
        font-size: 28px;
        position: relative;
        top: -10px;
    }

    .header .header-right {
        display: inline-block;
        float: right;
    }


    .header-right a{
        padding-right: 5px;
        line-height: 44px;
    }

    .menu-button{
        line-height: 44px;
    }


    @media only screen and (max-width: 600px) {

        .header, .header-right {
            height: 35px;
        }

        .header {
            padding-left: 5px;
            padding-right: 1px;
        }

        .header .logo {
            max-height: 32px;
            padding-right: 3px;
        }

        .header .logo-text {
            font-size: 20px;
        }


        .header .header-right a {
            font-size: 12px;
            padding-right: 5px;
            position: relative;
            top: -5px;
        }

    }

    .bell-cover {
        display: inline-block;
    }

    .bell-cover i{
        color: var(--primary-color-color);
        font-size: 20px;
        top: 0;
    }

    .bell-cover i:hover{
        color: var(--font-color)
    }

    .bell-cover .fa-stack{
        vertical-align: inherit;
    }

    .bell-cover .fa-stack[data-count]:after{
        position:absolute;
        right:-3px;
        top:0;
        content: attr(data-count);
        font-size: 10px;
        padding:5px;
        border-radius:999px;
        line-height:5px;
        color: white;
        background:rgba(255,0,0,.85);
        text-align:center;
        font-weight:bold;
    }



</style>