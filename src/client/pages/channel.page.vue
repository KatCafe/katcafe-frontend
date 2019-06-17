<template>

    <layout :stickyButtons="stickyButtons" ref="layout">

        <div slot="content" >

            <div v-if="channel">

                <hero :title="channel.slug" :icon="channel.icon" :cover="channel.cover" />

            </div>

            <div class="row">

                <div v-if="channel">
                    <topics :topics="topics" :comments="comments" />
                </div>

                <div v-if="!channel">
                    <span>Channel <strong>{{ this.slug }}</strong> was not found</span>
                </div>

            </div>


        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Hero from "client/components/heros/hero"
import Topics from "client/components/modules/topics/view/topics"

export default {

    components: { Layout,  Hero, Topics },

    async asyncData ({ store,  route }){

        if (route.params.slug) {
            await store.dispatch('CHANNEL_GET', {slug: route.path,});
            await store.dispatch('TOPICS_GET', {searchQuery: 'channel', search: route.path });
        }

    },

    computed: {

        channel(){
            return this.$store.state.channels.channel;
        },

        topics(){
            return this.$store.state.topics.list||[];
        },

        comments(){
            return this.$store.state.comments.list||[];
        },

        stickyButtons(){
            return [
                {
                    title: "Write topic",
                    img: 'https://cdn4.iconfinder.com/data/icons/cologne/32x32/plus.png',
                    click: () => this.$refs['layout'].showAddTopicModal( )
                }
            ]
        },

    },

    created() {
        this.slug = this.$route.params.slug;
    },

}
</script>

<style>

</style>