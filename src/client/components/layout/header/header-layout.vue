<template>


    <div class="sticky">

        <header-menu />

        <router-link to="/">
            <div class="header">
                <img src="/public/assets/catcafe-logo.png" class="logo">
                <span class="header-heading logoText">catcafé</span>
            </div>
        </router-link>


    </div>


</template>

<script>

import HeaderMenu from "./header-menu"

export default {


    components: {
        HeaderMenu,
    },

    data() {
        return {}
    },

    methods: {

    },

    mounted() {

    }

}

</script>

<style>

</style>