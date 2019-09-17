<template>

    <layout :stickyButtons="stickyButtons">

        <template slot="content" >

            <div v-if="channel">
                <hero :title="channel.slug" :icon="channel.icon" :cover="channel.cover" />
            </div>

            <div class="row">

                <div class="column left">

                    <div v-if="channel" >
                        <topics :topics="topics" :comments="comments" />
                    </div>

                    <div v-if="!channel">
                        <span>Channel <strong>{{ this.slug }}</strong> was not found</span>
                    </div>

                </div>

                <div v-if="visibleStickyRightSidebarComment" class="column right">
                    <sticky-right-sidebar-comment :channel="channel" />
                </div>



            </div>

            <infinite-scroll ref="refInfiniteScroll" @onScroll="onScrollLoad" :hasMore="hasMore" :infinitePrevUri="getPrevUri" :infiniteNextUri="getNextUri" />

        </template>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Hero from "client/components/heros/hero"
import Topics from "client/components/modules/topics/view/topics"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import InfiniteScroll from "client/components/UI/elements/infinite-scroll"

export default {

    components: { Layout,  Hero, Topics, StickyRightSidebarComment, InfiniteScroll },

    async asyncData ({ store,  route }){

        let path = route.path;
        if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

        if (route.params.slug) {

            store.commit('SET_TOPICS', [] );
            store.commit('SET_COMMENTS', [] );

            await store.dispatch('CHANNEL_GET', {slug: path,});
            await store.dispatch('TOPICS_GET', {searchQuery: 'channel', search: path, index: route.params.pageIndex ?  route.params.pageIndex - 1 : 0 });
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

        hasMore(){
            return this.$store.state.topics.pageMore;
        },

        pageIndex(){
            return this.$store.state.topics.pageIndex;
        },


        stickyButtons(){
            return [
                {
                    title: "Write topic",
                    img: 'https://cdn4.iconfinder.com/data/icons/cologne/32x32/plus.png',
                    click: (layout) => layout.showAddTopicModal( )
                }
            ]
        },

        visibleStickyRightSidebarComment(){
            return this.$store.state.global.showStickyRightSidebarComment;
        },


        getPageUri(){

            if (!this.channel) return '';
            return '/'+ this.channel.slug +'/pageIndex/';
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

        async onScrollLoad(){

            let path = this.$route.path;
            if (this.$route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

            await this.$store.dispatch('TOPICS_GET', { searchQuery: 'channel', search: path, index: this.$store.state.topics.pageIndex , count: this.$store.state.topics.pageCount });
            this.$refs['refInfiniteScroll'].continueScroll();
        },


    },

}
</script>

<style>

</style>