<template>

    <div>
        <content-options-bar :class="pclass"/>

        <div :class="`row content-display ${pclass}`">

            <div class="column left">

                <add-topic-form :topicChannel="channelToWrite" />

                <icon icon="loading-spinner" v-if="!topics.length && !comments.length && layoutLoading" class="fa-5x" />

                <template v-if="!topics.length && !comments.length && !layoutLoading">
                    <span>Channel <strong>{{ this.slug }}</strong> was not found</span>
                </template>

                <template v-if=" contentDisplay === 'topics' " >

                    <topics v-if="topics.length" :topics="topics" class="content-display-topics"  />

                </template>

                <template v-if=" contentDisplay === 'comments' " >

                    <comments v-if="comments.length" :comments="comments" class="content-display-comments" :isContentDisplay="true" />

                </template>

            </div>


            <div v-if="visibleStickyRightSidebarComment " class="column right">
                <sticky-right-sidebar-comment :channel="channelToWrite" />
            </div>

        </div>

        <infinite-scroll v-if="!layoutLoading" @onScroll="onScrollLoad" :hasMore="hasMore" :infinitePrevUri="getPrevUri" :infiniteNextUri="getNextUri" />


    </div>

</template>

<script>

import ContentOptionsBar from "./content-options/content-options-bar"
import Topics from "client/components/modules/content/topics/view/topics"
import Comments from "client/components/modules/content/comments/view/comments"
import AddTopicForm from "client/components/modules/content/topics/add-topic.form"
import StickyRightSidebarComment from "client/components/modules/right-sidebar/sticky-right-sidebar-comment"
import InfiniteScroll from "client/components/UI/elements/infinite-scroll"
import Icon from "client/components/UI/elements/icons/icon"

export default {

    components: {AddTopicForm, ContentOptionsBar, Topics, Comments, StickyRightSidebarComment, InfiniteScroll, Icon},

    props:{
        slug: {default: ''},
        channelToWrite: {default: ''},
        pclass: {default: ''},
    },

    data(){
        return {
        }
    },

    computed:{

        layoutLoading(){
            return this.$store.state.global.layoutLoading;
        },

        contentDisplay(){
            return this.$store.state.content.contentDisplay;
        },

        topics(){
            return this.$store.getters.getTopics();
        },

        comments(){
            return this.$store.getters.getComments('date', 1);
        },

        visibleStickyRightSidebarComment(){
            return this.$store.state.global.showStickyRightSidebarComment;
        },


        hasMore(){
            return this.$store.state.content[this.contentDisplay+'Settings'].pageMore;
        },

        pageIndex(){
            return this.$store.state.content[this.contentDisplay+'Settings'].pageIndex;
        },


        getPageUri(){
            return '/'+ this.slug +'/pageIndex/';
        },

        getPrevUri(){
            if (this.pageIndex > 1) return this.getPageUri+(this.pageIndex-1);
        },

        getNextUri(){
            if (this.hasMore) return this.getPageUri+(this.pageIndex+1);
        }
    },

    methods: {

        async onScrollLoad(resolver){

            await this.$store.dispatch('CONTENT_GET', {  })

            resolver(true)

        },

    },

}
</script>

<style>

    .content-display-comments .comment{
        margin-bottom: 10px;
    }

</style>