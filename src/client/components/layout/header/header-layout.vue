<template>


    <div class="sticky">

        <header-menu />

        <div class="header">

            <router-link to="/">
                <img src="/public/assets/catcafe-logo.png" class="logo">
                <span class="header-heading logoText">catcafé</span>
            </router-link>

            <country-select class="country-select" :defaultCountryCode="defaultCountry" :countryAllowed="countryAllowed" />

        </div>


    </div>


</template>

<script>

import HeaderMenu from "./header-menu"
import CountrySelect from "../../UI/elements/select/country-select";

export default {

    components: {
        CountrySelect,
        HeaderMenu,
    },

    data() {
        return {
            countryAllowed: [ 'ro', 'usa', 'md', ]
        }
    },

    computed: {

        defaultCountry(){
            return this.$store.state.localization.countryCode;
        }

    },

    methods: {

    },

    mounted() {

    }

}

</script>

<style>

</style>