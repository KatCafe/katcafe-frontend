<template>

    <layout :stickyButtons="stickyButtons" ref="layout">

        <div slot="content"  >

            <div class="row">


                <div class="column left">

                    <div v-if="topic">

                        <topic :topic="topic" :comments="comments" :isPage="true" />

                    </div>


                    <div v-if="!topic">
                        <span>Topic <strong>{{ this.slug }}</strong> was not found</span>
                    </div>

                </div>

                <div v-if="showStickyRightSidebarComment" class="column right">

                    <sticky-right-sidebar-comment :topic="topic" :channel="channel" />

                </div>

            </div>


        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Hero from "client/components/heros/hero"
import Topic from "client/components/modules/topics/view/topic"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"

export default {

    components: { Layout,  Hero, Topic, StickyRightSidebarComment },

    async asyncData ( { store,  route } ){

        if (route.params.slug) {

            await store.dispatch('TOPIC_GET', {slug: route.path,});

            if (store.state.topics.topic)
                await store.dispatch('CHANNEL_GET', {slug: route.path.substr(0, route.path.lastIndexOf('/')) });

            await store.dispatch('COMMENTS_GET', {searchRevert: true, searchAlgorithm: "date", searchQuery: 'topic', search: route.path, index: 1 });
        }

    },

    data(){
        return {
        }
    },

    mounted(){

        if (typeof window === "undefined") return;

    },

    computed: {

        channel(){
            return this.$store.state.channels.channel;
        },

        topic(){
            return this.$store.state.topics.topic;
        },

        comments(){
            const topic = this.topic;
            return this.$store.state.comments.list.filter( it => it.topic === topic.slug );
        },

        stickyButtons(){
            return [
                // {
                //     title: "Write topic",
                //     img: 'https://cdn2.iconfinder.com/data/icons/32pxmania/misc_03.png',
                //     click: () => this.$refs['layout'].showAddTopicModal( )
                // }
            ]
        },

        showStickyRightSidebarComment(){
            return this.$store.state.global.showStickyRightSidebarComment;
        }

    },

    created() {
        this.slug = this.$route.params.slug;
    },

}
</script>

<style>

</style>