<template>

    <div class="nav-bar">
            <ul class="nav">
                <li v-for=" (it, index) in channels "
                    :key="index">

                    <router-link :to="`/${it}`" >
                        {{it}}
                    </router-link>

                </li>
            </ul>
    </div>

</template>

<script>
export default {

    mounted(){

        if (typeof window === "undefined") return;

        this.$store.dispatch('CHANNEL_LIST_NAV_BAR_GET', {country: this.$store.state.localization.countryCode });

    },

    computed: {

        channels(){
            return this.$store.state.channels.list;
        },

    }

}
</script>

<style>


</style>