<template>

    <layout >

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

export default {

    components: { Layout, Topics, StickyRightSidebarComment },

    async asyncData ({ store,  route }){

        await store.dispatch('TOPICS_GET', {searchQuery: 'country', search: route.path !== '/' ? route.path : store.state.localization.selectedCountryCode });

    },

    watch: {
        '$route': {
            deep: true,
            handler: async function (refreshPage) {
                await this.$store.dispatch('TOPICS_GET', {searchQuery: 'country', search: this.$route.path !== '/' ? this.$route.path : this.$store.state.localization.selectedCountryCode });
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
            return [
                // {
                //     title: "Write topic",
                //     img: 'https://cdn2.iconfinder.com/data/icons/32pxmania/misc_03.png',
                //     click: () => this.$refs['layout'].showAddTopicModal( )
                // }
            ]
        },


        visibleStickyRightSidebarComment(){
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