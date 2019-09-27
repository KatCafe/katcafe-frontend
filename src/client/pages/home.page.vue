<template>

    <layout :stickyButtons="stickyButtons" >

        <div slot="content"  >

            <hero :title="'/'+this.getChannel" :cover="getChannelCover" :titleStyle="getChannelTitleColor" />

            <content-display :slug="getChannel" :channelToWrite="getHomepageChannel" />

            <infinite-scroll ref="refInfiniteScroll" @onScroll="onScrollLoad" :hasMore="hasMore" :infinitePrevUri="getPrevUri" :infiniteNextUri="getNextUri" />

        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import BrowserHelper from "modules/helpers/browser.helpers"
import Hero from "client/components/heros/hero"
import InfiniteScroll from "client/components/UI/elements/infinite-scroll"
import ContentDisplay from "client/components/modules/content/content-display"

export default {

    components: { Layout, StickyRightSidebarComment, Hero, InfiniteScroll, ContentDisplay },

    async asyncData ({ store,  route }){

        console.log('home asyncData', route.path);

        let path = route.path;

        try{

            if (route.params.pageIndex) path = path.substr(0, path.indexOf('/pageIndex/'));

            const country = store.state.localization.selectedCountryCode;

            path = BrowserHelper.trimSlash(path) !== '' ? BrowserHelper.trimSlash(path) : country;

            store.commit('SET_GLOBAL_LAYOUT_LOADING', true);

            store.commit('SET_TOPICS', [] );
            store.commit('SET_COMMENTS', [] );

            await store.dispatch('CHANNEL_GET', {slug: path });

            await store.dispatch('TOPICS_GET', {searchQuery: 'country', search: path, index: route.params.pageIndex ?  route.params.pageIndex - 1 : 0, count: 5 });

            store.commit('SET_GLOBAL_LAYOUT_LOADING', false);


        }catch(err){
            console.error('home page raised an error', path);
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
            if (channel === 'us') return 'https://styles.redditmedia.com/t5_2cneq/styles/bannerBackgroundImage_6yzzdjhguh521.jpeg?format=pjpg&s=8c0a444089bdc858bd2764f5376352e7c5d27f5a';
            if (channel === 'md') return 'https://www.nationsonline.org/gallery/Moldova/Lakes-near-Chisinau-Moldova.jpg';

            return '';
        },

        getChannelTitleColor(){

            const channel = this.getChannel;

            if (channel === 'us') return 'color: black;';

            return '';
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

    methods:{

        async onScrollLoad(){

            await this.$store.dispatch('TOPICS_GET', { searchQuery: 'country', search: this.getChannel, index: this.$store.state.topics.pageIndex, count: this.$store.state.topics.pageCount });
            this.$refs['refInfiniteScroll'].continueScroll();
        },


    },


}
</script>
