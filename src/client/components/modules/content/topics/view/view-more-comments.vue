<template>

    <div>

        <router-link :to="isPage ? '' : to" v-if="!loading && commentsToLoad > 0 && !isPage" @click.native.prevent.capture="viewMoreComments">
            <span class=" view-more-comments"> {{$t('topic.viewMoreComments') + ' '+ $tc('plural.comment', commentsToLoad ) }}</span>
        </router-link>

        <icon icon="loading-spinner" v-if="loading" class="fa-2x" />

    </div>

</template>

<script>

import Icon from "client/components/UI/elements/icons/icon"

export default {

    components: {Icon},

    props: {

        comments: {default: function ()  { } },
        topic: {default: function( ) { } },
        isPage: false,

    },

    data(){
        return {
            loading: false,
        }
    },

    computed: {

        to(){
            return '/'+this.topic.slug;
        },

        commentsToLoad(){
            return this.topic.comments - this.comments.length
        },

    },

    methods: {

        async viewMoreComments(){

            this.loading = true;
            try{
                await this.$store.dispatch('TOPIC_GET_MORE_COMMENTS', { slug: this.topic.slug})
            }catch(err){

            }
            this.loading = false;
        },

    },

}
</script>

<style>

    .topic .view-more-comments{
        display: inline-block;
        padding: 0 15px 10px;
        color: var(--primary-color);
        font-size: 12px;
    }


</style>