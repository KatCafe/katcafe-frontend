<template>

    <layout >

        <div slot="content"  >

            <div class="row">

                <div v-if="topics.length">
                    <topics :topics="topics" :comments="comments"  />
                </div>

                <div v-if="!topics.length">
                    <span>Channel <strong>{{ this.slug }}</strong> was not found</span>
                </div>

            </div>

        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Topics from "client/components/modules/topics/view/topics"

export default {

    components: { Layout, Topics },

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

    },

    created() {
        this.slug = this.$route.params.slug;
    },


}
</script>

<style>

</style>