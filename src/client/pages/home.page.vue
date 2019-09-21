<template>

    <layout :stickyButtons="stickyButtons" >

        <div slot="content"  >

            <template>
                <hero :title="'/'+this.getChannel" :cover="getChannelCover" :titleStyle="getChannelTitleColor" />
            </template>

            <div class="row">

                <div class="column left">

                    <template v-if="topics.length">
                        <topics :topics="topics" :channel="getHomepageChannel" />
                    </template>

                    <template v-if="!topics.length && !layoutLoading ">
                        <span>Channel <strong>{{ this.slug }}</strong> was not found</span>
                    </template>

                </div>

            </div>

            <infinite-scroll ref="refInfiniteScroll" @onScroll="onScrollLoad" :hasMore="hasMore" :infinitePrevUri="getPrevUri" :infiniteNextUri="getNextUri" />

        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Topics from "client/components/modules/topics/view/topics"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import BrowserHelper from "modules/helpers/browser.helpers"
import Hero from "client/components/heros/hero"
import InfiniteScroll from "client/components/UI/elements/infinite-scroll"

export default {

    components: { Layout, Topics, StickyRightSidebarComment, Hero, InfiniteScroll },

    async asyncData ({ store,  route }){

        console.log('home asyncData');

        let path = route.path;
        if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

        const country = store.state.localization.selectedCountryCode;

        path = BrowserHelper.trimSlash(path) !== '' ? BrowserHelper.trimSlash(path) : country;

        store.commit('SET_GLOBAL_LAYOUT_LOADING', true);

        store.commit('SET_TOPICS', [] );
        store.commit('SET_COMMENTS', [] );

        await store.dispatch('CHANNEL_GET', {slug: path });

        await store.dispatch('TOPICS_GET', {searchQuery: 'country', search: path, index: route.params.pageIndex ?  route.params.pageIndex - 1 : 0, count: 5 });

        store.commit('SET_GLOBAL_LAYOUT_LOADING', false);

    },

    watch: {
        '$route': {
            deep: true,
            handler: async function (refreshPage) {

                console.log('home route changed');

                this.$store.commit('SET_GLOBAL_LAYOUT_LOADING', true);

                await this.$store.dispatch('CHANNEL_GET', {slug: this.getChannel,});

                this.$store.commit('SET_TOPICS', [] );
                await this.$store.dispatch('TOPICS_GET', {searchQuery: 'country', search: this.getChannel });

                this.$store.commit('SET_GLOBAL_LAYOUT_LOADING', false);
            }
        }
    },



    computed: {

        layoutLoading(){
            return this.$store.state.global.layoutLoading;
        },

        getHomepageChannel(){
            return this.getChannel + '/b';
        },

        getChannel(){
            const country = this.$store.state.localization.selectedCountryCode;
            let path = this.$route.path;
            if (this.$route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

            return BrowserHelper.trimSlash(path) !== '' ? BrowserHelper.trimSlash(path) : country
        },

        getChannelCover(){

            const channel = this.getChannel;

            if (channel === 'ro') return 'https://www.tetratech.com/en/images/rg18-201-water-solutions-for-asia-2000.jpg?blobheader=image/jpeg';
            if (channel === 'us') return 'http://mindfluencerevolution.com/wp-content/uploads/2017/08/woman-breakthrough.jpg';
            if (channel === 'md') return 'http://tour.tt.org.ua/data/uploads/cycle/tt1-min.jpg';

            return '';
        },

        getChannelTitleColor(){

            const channel = this.getChannel;

            if (channel === 'us') return 'color: black;';

            return '';
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
            return '/'+ this.getChannel +'/pageIndex/';
        },

        getPrevUri(){
            if (this.pageIndex > 1) return this.getPageUri+(this.pageIndex-1);
        },

        getNextUri(){
            if (this.hasMore) return this.getPageUri+(this.pageIndex+1);
        }

    },

    created() {
        this.slug = this.$route.path;
    },

    methods:{

        async onScrollLoad(){

            await this.$store.dispatch('TOPICS_GET', { searchQuery: 'country', search: this.getChannel, index: this.$store.state.topics.pageIndex, count: this.$store.state.topics.pageCount });
            this.$refs['refInfiniteScroll'].continueScroll();
        },


    },


}
</script>

<style>

</style>