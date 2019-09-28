<template>

    <layout :stickyButtons="stickyButtons">

        <template slot="content" >

            <hero v-if="channel" :title="channel.slug" :icon="channel.icon" :cover="channel.cover" />

            <content-display :slug="channel ? channel.slug : ''" :channelToWrite="channel ? channel.slug : ''" />

        </template>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import BrowserHelper from "modules/helpers/browser.helpers"

import Hero from "client/components/heros/hero"
import ContentDisplay from "client/components/modules/content/content-display"

export default {

    components: { Layout,  Hero, ContentDisplay },

    async asyncData ({ store,  route }){

        console.log('channel async data', route.path);

        return store.dispatch('CONTENT_INIT', {route, country: store.state.localization.selectedCountryCode});

    },

    computed: {


        channel(){
            return this.$store.state.channels.channel;
        },


        stickyButtons(){
            return [
            ]
        },

    },



    /**
     * SEO
     */

    title: function (){
        return this.channel ? this.channel.name : '';
    },

    description: function (){
        return this.channel ? this.channel.title : '';
    },

    images: function(){
        return ( this.channel && this.channel.icon ) ?
            [ {
                url: this.channel.icon
            }]
            : ''
    },


}
</script>
