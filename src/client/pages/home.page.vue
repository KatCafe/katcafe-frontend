<template>

    <layout :stickyButtons="stickyButtons" ref="layout" >

        <div slot="content"  >

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

export default {

    components: { Layout, Topics, StickyRightSidebarComment },

    async asyncData ({ store,  route }){

        const path = route.path, country = store.state.localization.selectedCountryCode;
        await store.dispatch('TOPICS_GET', {searchQuery: 'country', search: BrowserHelper.trimSlash(path) !== '' ? BrowserHelper.trimSlash(path) : country });

    },

    watch: {
        '$route': {
            deep: true,
            handler: async function (refreshPage) {
                const path = this.$route.path, country = this.$store.state.localization.selectedCountryCode;
                await this.$store.dispatch('TOPICS_GET', {searchQuery: 'country', search: BrowserHelper.trimSlash(path) !== '' ? BrowserHelper.trimSlash(path) : country });
            }
        }
    },

    computed: {

        topics(){
            return this.$store.state.topics.list||[];
        },

        comments(){
            return this.$store.state.comments.list||[];
        },

        stickyButtons(){

            const path = this.$route.path, country = this.$store.state.localization.selectedCountryCode;
            const search = BrowserHelper.trimSlash(path) !== '' ? BrowserHelper.trimSlash(path) : country;

            return [
                {
                    title: "Write topic",
                    img: 'https://cdn4.iconfinder.com/data/icons/cologne/32x32/plus.png',
                    click: () => this.$refs['layout'].showAddTopicModal( search+ '/b' )
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



}
</script>

<style>

</style>