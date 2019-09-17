<template>

    <layout :stickyButtons="stickyButtons" >

        <template slot="content"  >

            <div class="row topicPage">

                <div class="column left">

                    <template v-if="topic">

                        <topic :topic="topic" :comments="comments" :isPage="true" />

                    </template>


                    <template v-if="!topic">
                        <span class="actionButton">Topic <strong>{{ this.slug }}</strong> was not found</span>
                    </template>

                </div>

                <div class="column right replyRightBox">

                    <sticky-right-sidebar-comment :topic="topic" :channel="channel" />

                </div>

            </div>

            <infinite-scroll ref="refInfiniteScroll" @onScroll="onScrollLoad" :hasMore="hasMore" :infinitePrevUri="getPrevUri" :infiniteNextUri="getNextUri" />

        </template>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Hero from "client/components/heros/hero"
import Topic from "client/components/modules/topics/view/topic"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import InfiniteScroll from "client/components/UI/elements/infinite-scroll"

export default {

    components: { Layout,  Hero, Topic, StickyRightSidebarComment, InfiniteScroll },

    async asyncData ( { store,  route } ){

        let path = route.path;
        if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

        console.log(route.params.slug);

        if (route.params.slug) {

            store.commit('SET_COMMENTS', [] );

            await store.dispatch('TOPIC_GET', {slug: path,});

            if (store.state.topics.topic)
                await store.dispatch('CHANNEL_GET', {slug: store.state.topics.topic.channel  });

            await store.dispatch('COMMENTS_GET', {searchRevert: true, searchAlgorithm: "date", searchQuery: 'topic', search: path, index: route.params.pageIndex ?  route.params.pageIndex - 1 : 0});
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

        hasMore(){
            return this.$store.state.comments.pageMore;
        },

        pageIndex(){
            return this.$store.state.comments.pageIndex;
        },

        stickyButtons(){

            return [
            ]
        },

        visibleStickyRightSidebarComment(){
            return this.$store.state.global.showStickyRightSidebarComment;
        },

        getPageUri(){
            return '/'+ this.topic.slug +'/pageIndex/';
        },

        getPrevUri(){
            if (this.pageIndex > 1) return this.getPageUri+(this.pageIndex-1);
        },

        getNextUri(){
            if (this.hasMore) return this.getPageUri+(this.pageIndex+1);
        }

    },

    created() {
        this.slug = this.$route.params.slug;
    },

    methods:{

        openStickyRightSidebarComment(){
            this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.topic.slug, channel: this.topic.channel })
        },

        async onScrollLoad(){

            let path = this.$route.path;
            if (this.$route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

            await this.$store.dispatch('COMMENTS_GET', {searchRevert: true, searchAlgorithm: "date", searchQuery: 'topic', search: path, index: this.pageIndex , count: this.$store.state.comments.pageCount });
            this.$refs['refInfiniteScroll'].continueScroll();
        },

    }

}
</script>

<style>

</style>