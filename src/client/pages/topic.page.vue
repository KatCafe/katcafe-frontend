<template>

    <layout :stickyButtons="stickyButtons" ref="layout">

        <div slot="content"  >

            <div v-if="topic">

                <hero :title="topic.channel.slug" :icon="topic.channel.icon" :cover="topic.channel.cover" />

            </div>

            <div class="content">
                <div class="container">

                    <div v-if="topic">
                        <topic :topic="topic" />
                    </div>


                    <div v-if="!topic">
                        <span>Topic <strong>{{ this.slug }}</strong> was not found</span>
                    </div>

                </div>
            </div>


        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Hero from "client/components/heros/hero"
import Topic from "client/components/modules/topics/view/topic"

export default {

    components: { Layout,  Hero, Topic },

    async asyncData ( { store,  route } ){

        if (route.params.slug) {
            await store.dispatch('CHANNEL_GET', {slug: route.path,});
            await store.dispatch('TOPICS_GET', {searchQuery: 'channel', search: route.path });
        }

    },

    computed: {

        topic(){
            return this.$store.state.topics.topic;
        },

        stickyButtons(){
            return [
                {
                    title: "Write topic",
                    img: 'https://cdn4.iconfinder.com/data/icons/momenticons-basic/32x32/edit2.png',
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