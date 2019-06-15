<template>

    <form action="/action_page.php" >

        <label for="fname">Channel Name</label>
        <input type="text" id="fname" name="name" placeholder="Channel Name" v-model="channelName">

        <label for="ftitle">Channel Title</label>
        <input type="text" id="ftitle" name="title" placeholder="Channel Title" v-model="channelTitle">

        <label for="lname">Icon</label>
        <input type="text" id="lname" name="icon" placeholder="Icon" v-model="channelIcon">

        <label for="lname">Cover</label>
        <input type="text" id="lname" name="cover" placeholder="Cover" v-model="channelCover">

        <label>Country</label>
        <no-ssr>
            <country-select @onSelect="channelCountrySelected" :defaultCountryCode="defaultCountry" />
        </no-ssr>

        <input type="button" value="Create" @click="createChannel">

        {{error}}

    </form>

</template>

<script>

import CountrySelect from "client/components/UI/elements/select/country-select"
import NoSsr from "vue-no-ssr";
import NetworkHelper from "modules/network/network-helper"

export default {

    components: { NoSsr,  CountrySelect, },

    data(){
        return {
            channelName: '',
            channelTitle: '',
            channelIcon: '',
            channelCover: '',
            channelCountry: '',

            error : '',
        }
    },

    computed: {

        defaultCountry(){
            return this.$store.state.localization.countryCode;
        }

    },

    methods: {

        channelCountrySelected(name, code){
            this.channelCountry = code;
        },

        async createChannel(e){

            try{

                this.error = '';

                const out = await NetworkHelper.post('/channels/create', {
                    name: this.channelName,
                    title: this.channelTitle,
                    icon: this.channelIcon,
                    cover: this.channelCover,
                    country: this.channelCountry || this.defaultCountry,
                });

                if (!out || !out.result) throw "An error was encountered";

                this.$router.push({path: '/'+out.channel.slug });

            }catch(err){

                this.error = err.message;

            }

            e.stopPropagation();

        },

    }

}
</script>


<style>

</style>