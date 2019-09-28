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

        let path = BrowserHelper.trimSlash(route.path);
        if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex'));

        path = path !== '' ? path : store.state.localization.selectedCountryCode;

        store.commit('SET_CONTENT_DISPLAY', 'topics' );

        store.commit('SET_CONTENT_PAGE_INFO', { contentDisplay: 'topics', pageIndex: route.params.pageIndex ? route.params.pageIndex -1 : 0, pageCount: route.params.pageCount ? route.params.pageCount : 5, pageMore: true,})
        store.commit('SET_CONTENT_SEARCH_QUERY', { contentDisplay: 'topics', searchQuery: 'channel', searchAlgorithm:'hot', search: path, searchRevert: false });

        store.commit('SET_CONTENT_PAGE_INFO', { contentDisplay: 'comments', pageIndex: route.params.pageIndex ? route.params.pageIndex -1 : 0, pageCount: route.params.pageCount ? route.params.pageCount : 5, pageMore: true,})
        store.commit('SET_CONTENT_SEARCH_QUERY', { contentDisplay: 'comments', searchQuery: 'channel', searchAlgorithm:'date', search: path, searchRevert: true, });

        store.commit('SET_TOPICS', [] );
        store.commit('SET_COMMENTS', [] );

        return store.dispatch('CONTENT_GET', {  })

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
