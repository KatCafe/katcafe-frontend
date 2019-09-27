<template>

    <layout :stickyButtons="stickyButtons">

        <template slot="content" >

            <template v-if="channel">
                <hero :title="channel.slug" :icon="channel.icon" :cover="channel.cover" />
            </template>

            <div class="row">

                <div class="column left">

                    <topics v-if="channel" :topics="topics"  />

                    <template v-if="!channel && !layoutLoading">
                        <span>Channel <strong>{{ this.slug }}</strong> was not found</span>
                    </template>

                </div>

                <div v-if="visibleStickyRightSidebarComment " class="column right">
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
import Topics from "client/components/modules/content/topics/view/topics"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import InfiniteScroll from "client/components/UI/elements/infinite-scroll"

export default {

    components: { Layout,  Hero, Topics, StickyRightSidebarComment, InfiniteScroll },

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

        layoutLoading(){
            return this.$store.state.global.layoutLoading;
        },

        channel(){
            return this.$store.state.channels.channel;
        },

        topics(){
            return this.$store.getters.getTopics();
        },

        hasMore(){
            return this.$store.state.topics.pageMore;
        },

        pageIndex(){
            return this.$store.state.topics.pageIndex;
        },


        stickyButtons(){
            return [
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
