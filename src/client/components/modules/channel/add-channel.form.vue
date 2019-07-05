<template>

    <form class="addChanelForm" action="/action_page.php" >

        <!--<label for="fname">Channel Name</label>-->
        <input type="text" id="fname" name="name" placeholder="Channel Name" v-model="channelName">

        <!--<label for="ftitle">Channel Title</label>-->
        <input type="text" id="ftitle" name="title" placeholder="Channel Title" v-model="channelTitle">

        <!--<label for="lname">Icon</label>-->
        <input type="text" id="lname" name="icon" placeholder="Chanel Logo Link" v-model="channelIcon">

        <!--<label for="lname">Cover</label>-->
        <input type="text" id="lname" name="cover" placeholder="Chanel Cover Image" v-model="channelCover">

        <!--<label>Country</label>-->
        <no-ssr>
            <country-select @onSelect="channelCountrySelected" :defaultCountryCode="defaultCountry" />
        </no-ssr>

        <captcha ref="captcha" @submit="createChannel"/>

        <span class="errorText">{{error}}</span>

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

        async createChannel(e){

            const captcha = this.$refs['captcha'];

            try{

                this.error = '';

                const out = await NetworkHelper.post('/channels/create', {
                    name: this.channelName,
                    title: this.channelTitle,
                    icon: this.channelIcon,
                    cover: this.channelCover,
                    country: this.channelCountry || this.defaultCountry,
                    captcha: {
                        solution: captcha.captchaInput,
                        encryption: captcha.captcha.encryption,
                    }
                });

                if (!out || !out.result) throw "An error was encountered";

                captcha.reset();

                this.$router.push({path: '/'+out.channel.slug });

            }catch(err){

                this.error = err.message;

                if (this.error.indexOf("Captcha was already used") >= 0 || this.error.indexOf("Captcha is incorrect") >= 0 )
                    captcha.reset();

            }

            e.stopPropagation();

        },

    }

}
</script>


<style>

</style>