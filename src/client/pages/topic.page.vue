<template>

    <layout :stickyButtons="stickyButtons" ref="layout">

        <div slot="content"  >

            <div class="row">


                <div class="column left">

                    <div v-if="topic">
                        <topic :topic="topic" />
                    </div>


                    <div v-if="!topic">
                        <span>Topic <strong>{{ this.slug }}</strong> was not found</span>
                    </div>

                </div>

                <div class="column right">

                    <div class="rightSidebar stickySidebar">

                        <add-comment-form />


                    </div>

                </div>

            </div>


        </div>

    </layout>

</template>

<script>

const Sticky = require('sticky-js');

import Layout from "client/components/layout/layout"
import Hero from "client/components/heros/hero"
import Topic from "client/components/modules/topics/view/topic"
import AddCommentForm from "client/components/modules/comments/add-comment.form"

export default {

    components: { Layout,  Hero, Topic, AddCommentForm },

    async asyncData ( { store,  route } ){

        if (route.params.slug) {

            await store.dispatch('TOPIC_GET', {slug: route.path,});

            if (store.state.topics.topic)
                await store.dispatch('CHANNEL_GET', {slug: route.path.substr(0, route.path.lastIndexOf('/')) });

            //await store.dispatch('TOPICS_GET', {searchQuery: 'channel', search: route.path });
        }

    },

    mounted(){

        if (typeof window === "undefined") return;

        var sticky = new Sticky('.stickySidebar');

    },

    computed: {

        channel(){
            return this.$store.state.channels.channel;
        },

        topic(){
            return this.$store.state.topics.topic;
        },

        stickyButtons(){
            return [
                {
                    title: "Write topic",
                    img: 'https://cdn2.iconfinder.com/data/icons/32pxmania/misc_03.png',
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