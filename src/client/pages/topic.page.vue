<template>

    <layout :stickyButtons="stickyButtons" >

        <template slot="content"  >

            <div class="row topic-page">

                <div class="column left">

                    <topic v-if="topic" :topic="topic" :isPage="true" />

                    <template v-if="!topic && !layoutLoading">
                        <span >Topic <strong>{{ this.slug }}</strong> was not found</span>
                    </template>

                </div>

                <div class="column right comment-right-bar">
                    <sticky-right-sidebar-comment :topic="topic" :channel="channel" />
                </div>

            </div>

            <infinite-scroll v-if="topic"  @onScroll="onScrollLoad" :hasMore="hasMore" :infinitePrevUri="getPrevUri" :infiniteNextUri="getNextUri" />

        </template>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Hero from "client/components/heros/hero"
import Topic from "client/components/modules/content/topics/view/topic"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import InfiniteScroll from "client/components/UI/elements/waypoint/infinite-scroll"
import Icon from "client/components/UI/elements/icons/icon"

export default {

    components: { Layout,  Hero, Topic, StickyRightSidebarComment, InfiniteScroll, Icon,  },

    async asyncData ( { store,  route } ){

        console.log('topic async data', route.path);

        let path = route.path;

        try{

            if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

            if ( path ) {

                store.commit('SET_GLOBAL_LAYOUT_LOADING', true);

                await store.dispatch('TOPIC_GET', {slug: path,});

                if (store.state.topics.topic){
                    //no need to download the channel
                    await store.dispatch('CHANNEL_GET', {slug: store.state.topics.topic.channel  });
                    await store.dispatch('COMMENTS_GET', {searchRevert: true, searchAlgorithm: "date", searchQuery: 'topic', search: path, index: route.params.pageIndex ?  route.params.pageIndex - 1 : 0});
                }

                store.commit('SET_GLOBAL_LAYOUT_LOADING', false);

            }

        }catch(err){
            console.error('topic page raised an error', path);
        }

    },

    data(){
        return {
        }
    },


    computed: {

        layoutLoading(){
            return this.$store.state.global.layoutLoading;
        },


        channel(){
            return this.$store.state.channels.channel;
        },

        topic(){
            return this.$store.state.topics.topic;
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
            return `/${this.topic ? this.topic.slug : ''}/pageIndex/`;
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

        async onScrollLoad(resolver){

            let path = this.$route.path;
            if (this.$route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

            await this.$store.dispatch('COMMENTS_GET', {searchRevert: true, searchAlgorithm: "date", searchQuery: 'topic', search: path, index: this.pageIndex , count: this.$store.state.comments.pageCount });

            resolver(true);
        },

    },

    /**
     * SEO
     */

    title: function (){
        return this.topic ? this.topic.title : '';
    },

    description: function (){
        return this.topic ? this.topic.body : '';
    },

    images: function(){
        return this.topic && this.topic.preview ?
            [ {
                url: this.$store.getters.getPreviewImage( this.topic.preview, true ).img
            }]
            : ''
    },

}
</script>


<style>

    .topic-page{
        display: grid;
        grid-template-columns: 1fr 400px;
    }

    .comment-right-bar{
        width: 100%;
        padding: 0 10px;
    }

    @media only screen and (max-width: 900px) {

        .topic-page {
            grid-template-columns: 1fr;
        }

        .comment-right-bar{
            padding: 0;
        }

    }

</style>