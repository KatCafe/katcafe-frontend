<template>

    <div class="nav-bar">

        <country-select :defaultCountryCode="defaultCountry" :countryAllowed="countriesAllowed" @onSelect="countryChanged" />

        <header-channels-list class=" hiddenMobile" :channels="channels" :channel="getChannel ? getChannel.slug : ''" />

        <div class="hiddenDesktop">
            <header-channels-select :channels="channels" :channel="getChannel ? getChannel.slug : ''" />
        </div>

    </div>

</template>

<script>

import CountrySelect from "../../UI/elements/select/country-select";
import HeaderChannelsList from "./header-channels/header-channels-list"
import HeaderChannelsSelect from "./header-channels/header-channels-select"
import BrowserHelper from "modules/helpers/browser.helpers"

export default {

    components: { CountrySelect,  HeaderChannelsList, HeaderChannelsSelect },

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

        getChannel(){
            return this.$store.state.channels.channel;
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