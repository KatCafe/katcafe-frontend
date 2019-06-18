<template>

    <layout :stickyButtons="stickyButtons" ref="layout" >

        <div slot="content"  >

            <hero :title="'/'+this.getChannel" :cover="getChannelCover" :titleStyle="getChannelTitleColor" />

            <div class="row">

                <div class="column left">

                    <div v-if="topics.length">
                        <topics :topics="topics" :comments="comments"  />
                    </div>

                    <div v-if="!topics.length">
                        <span>Channel <strong>{{ this.slug }}</strong> was not found</span>
                    </div>

                </div>

                <div v-if="visibleStickyRightSidebarComment" class="column right">

                    <sticky-right-sidebar-comment  />

                </div>

            </div>

        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Topics from "client/components/modules/topics/view/topics"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import BrowserHelper from "modules/helpers/browser.helpers"
import Hero from "client/components/heros/hero"

export default {

    components: { Layout, Topics, StickyRightSidebarComment, Hero },

    async asyncData ({ store,  route }){

        const path = route.path, country = store.state.localization.selectedCountryCode;
        await store.dispatch('TOPICS_GET', {searchQuery: 'country', search: BrowserHelper.trimSlash(path) !== '' ? BrowserHelper.trimSlash(path) : country });

    },

    watch: {
        '$route': {
            deep: true,
            handler: async function (refreshPage) {
                await this.$store.dispatch('TOPICS_GET', {searchQuery: 'country', search: this.getChannel });
            }
        }
    },

    computed: {

        getChannel(){
            const path = this.$route.path, country = this.$store.state.localization.selectedCountryCode;
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
            return this.$store.state.topics.list||[];
        },

        comments(){
            return this.$store.state.comments.list||[];
        },

        stickyButtons(){


            return [
                {
                    title: "Write topic",
                    img: 'https://cdn4.iconfinder.com/data/icons/cologne/32x32/plus.png',
                    click: () => this.$refs['layout'].showAddTopicModal( this.getChannel + '/b' )
                }
            ]
        },


        visibleStickyRightSidebarComment(){
            return this.$store.state.global.showStickyRightSidebarComment;
        }

    },

    created() {
        this.slug = this.$route.path;
    },

    methods:{

    },


}
</script>

<style>

</style>