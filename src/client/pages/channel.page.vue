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
import Hero from "client/components/heros/hero"
import ContentDisplay from "client/components/modules/content/content-display"

export default {

    components: { Layout,  Hero, ContentDisplay },

    async asyncData ({ store,  route }){

        console.log('channel async data', route.path);

        let path = route.path;

        try{

            if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

            if (route.params.slug) {

                store.commit('SET_GLOBAL_LAYOUT_LOADING', true);

                store.commit('SET_TOPICS', [] );
                store.commit('SET_COMMENTS', [] );

                await store.dispatch('CHANNEL_GET', {slug: path,});
                await store.dispatch('TOPICS_GET', {searchQuery: 'channel', search: path, index: route.params.pageIndex ?  route.params.pageIndex - 1 : 0 });

                store.commit('SET_GLOBAL_LAYOUT_LOADING', false);
            }

        }catch(err){
            console.error('channel page raised an error', path);
        }

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
