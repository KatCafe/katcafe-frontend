<template>

    <div class="nav-bar">

        <country-select class="country-select" :defaultCountryCode="defaultCountry" :countryAllowed="countriesAllowed" @onSelect="countryChanged" />

        <template class="hiddenMobile">
            <ul class="nav">
                <li v-for=" (it, index) in channels "
                    :key="index">

                    <router-link :to="`/${it}`" >
                        {{it}}
                    </router-link>

                </li>
            </ul>
        </template>

    </div>

</template>

<script>

import CountrySelect from "../../UI/elements/select/country-select";

export default {

    components: {
        CountrySelect,
    },

    mounted(){

        if (typeof window === "undefined") return;

        this.$store.dispatch('CHANNEL_LIST_NAV_BAR_GET', {country: this.$store.state.localization.selectedCountryCode });

    },

    watch: {
        '$route': {
            deep: true,
            handler: async function (refreshPage) {
                this.$store.dispatch('CHANNEL_LIST_NAV_BAR_GET', {country: this.$store.state.localization.selectedCountryCode });
            }
        }
    },

    computed: {

        channels(){
            return this.$store.state.channels.navBarList;
        },

        defaultCountry(){
            return this.$store.state.localization.selectedCountryCode;
        },

        countriesAllowed(){
            return this.$store.state.localization.countriesAllowed;
        },

    },

    methods:{

        countryChanged(selectedCountry, selectedCountryCode ){

            this.$store.dispatch('LOCALIZATION_STORE_SELECTED', { selectedCountryCode, selectedCountry});
            this.$router.push({path: '/' +selectedCountryCode });

        }

    }

}
</script>

<style>


</style>