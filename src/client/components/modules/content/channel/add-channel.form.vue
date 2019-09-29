<template>

    <form class="form" action="#" >

        <label for="fname">Channel Name</label>
        <input type="text" id="fname" name="name" v-model="channelName">

        <label for="ftitle">Channel Title</label>
        <input type="text" id="ftitle" name="title" v-model="channelTitle">

        <label for="lname">Icon</label>
        <input type="text" id="lname" name="icon" v-model="channelIcon">

        <label for="lname">Cover</label>
        <input type="text" id="lname" name="cover" v-model="channelCover">

        <label>Country</label> <br/>
        <no-ssr>
            <country-select @onSelect="channelCountrySelected" :defaultCountryCode="defaultCountry" style="padding-bottom: 20px" />
        </no-ssr>

        <captcha ref="captcha" @submit="createChannel"/>

        <span class="error-text">{{error}}</span>

    </form>

</template>

<script>

import CountrySelect from "client/components/UI/elements/select/country-select"
import NoSsr from "vue-no-ssr";
import NetworkHelper from "modules/network/network-helper"
import Captcha from "client/components/modules/captcha/captcha"

export default {

    components: { NoSsr,  CountrySelect, Captcha },

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
            return this.$store.state.localization.selectedCountryCode;
        }

    },

    methods: {

        channelCountrySelected(name, code){
            this.channelCountry = code;
        },

        async createChannel(resolver, captchaData){

            const captcha = this.$refs['captcha'];

            try{

                this.error = '';

                const out = await NetworkHelper.post('/channels/create', {
                    name: this.channelName,
                    title: this.channelTitle,
                    icon: this.channelIcon,
                    cover: this.channelCover,
                    country: this.channelCountry || this.defaultCountry,
                    captcha: captchaData,
                });

                if (!out) throw "An error was encountered";

                captcha.reset();

                this.$router.push({path: '/'+out.channel.slug });

            }catch(err){

                this.error = captcha.processError(err.message);

            }

            resolver();

        },

    }

}
</script>

