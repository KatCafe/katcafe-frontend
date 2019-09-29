<template>

    <layout :stickyButtons="stickyButtons" >

        <div slot="content"  >

            <hero :title="'/'+this.getChannel" :cover="getChannelCover" :titleStyle="getChannelTitleColor" />

            <content-display  :slug="getChannel" :channelToWrite="getHomepageChannel" />

        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import BrowserHelper from "modules/helpers/browser.helpers"
import Hero from "client/components/heros/hero"
import ContentDisplay from "client/components/modules/content/content-display"

export default {

    components: { Layout, StickyRightSidebarComment, Hero, ContentDisplay },

    async asyncData ({ store,  route }){

        console.log('home asyncData', route.path);

        return store.dispatch('CONTENT_INIT', {route, searchQuery: 'country', country: store.state.localization.selectedCountryCode});

    },

    watch: {
        '$route': {
            deep: true,
            handler: async function (refreshPage) {

                console.log('home route changed');
                return this.$store.dispatch('CONTENT_INIT', { route: this.$route, searchQuery: 'country', country: this.$store.state.localization.selectedCountryCode});
            }
        }
    },

    computed: {


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

        stickyButtons(){
            return [
            ]
        },


        visibleStickyRightSidebarComment(){
            return this.$store.state.global.showStickyRightSidebarComment;
        },


    },



}
</script>
