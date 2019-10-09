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


<style>

    .nav {
        height: 30px;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .nav li {
        padding: 0;
        margin: 0;
        display: inline-block;
    }


    .nav li a {
        text-decoration: none;
        padding: 8px 4px 8px 4px;
        display: inline-block;
        height: 14px;
    }

    .nav li.selected a {
        color: var(--a-link-active);
        font-weight: bold;
    }

    @media only screen and (max-width: 1200px) {

        .nav li a {
            padding-top: 0px;
            height: 6px;
        }

    }

</style>