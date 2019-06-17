<template>


    <div class="sticky">

        <header-menu />

        <div class="header">

            <router-link to="/">
                <img src="/public/assets/catcafe-logo.png" class="logo">
                <span class="header-heading logoText">catcafé</span>
            </router-link>

            <country-select class="country-select" :defaultCountryCode="defaultCountry" :countryAllowed="countryAllowed" @onSelect="countryChanged" />

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
            countryAllowed: [ 'ro', 'us', 'md', ]
        }
    },

    computed: {

        defaultCountry(){
            return this.$store.state.localization.selectedCountryCode;
        }

    },

    methods: {

        countryChanged(selectedCountry, selectedCountryCode ){

            this.$store.dispatch('LOCALIZATION_STORE_SELECTED', { selectedCountryCode, selectedCountry});
            this.$router.push({path: '/' +selectedCountryCode });

        }

    },

    mounted() {

    }

}

</script>

<style>

</style>