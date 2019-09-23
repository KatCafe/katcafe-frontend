<template>
    <ul class="nav">
        <li v-for=" (it, index) in channels"
            :key="index"
            :class="`${it.toLowerCase() === channel.toLowerCase() ? 'selected' : ''}`"
        >

            <router-link :to="`/${it}`" >
                {{it.replace(defaultCountry+'/','')}}
            </router-link>

        </li>
    </ul>
</template>

<script>
export default {

    props: {
        channels: { default () { return [ ]}},
        channel:  { default: ''},
    },

    computed: {

        defaultCountry(){
            return this.$store.state.localization.selectedCountryCode;
        }

    },

}
</script>