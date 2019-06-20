<template>

    <div>

        <div class="topic">

            <div class="topicBox" >

                <vote :vote="vote"/>

                <div class="topicContent" ref="topicContent">


                    <router-link :to="isPage ? '' : to">

                        <div class="topicBoxContent" :class="this.topic.preview ? 'hasImage' : ''">

                            <preview-image :data="this.topic.preview" :link="link" />

                            <div class="topicTextWrap">

                                <div class="author">
                                    <span class="details authorName">{{author}}</span>

                                    <span class="details">>></span>

                                    <router-link :to="'/'+topic.channel">
                                        <span class="actionButton">{{topic.channel}}</span>
                                    </router-link>

                                    <span class="details">{{date}} ago</span>

                                    <div class="topicButtons">
                                        <span class="postId">Topic #{{ isPreview ? topic.uuid : 0}}</span>
                                    </div>

                                </div>


                                <h2 v-if="title" class="title">{{title}}</h2>

                                <p class="topicBody">{{body}}</p>

                            </div>

                        </div>

                    </router-link>

                    <div class="topicComments" v-if="this.comments" >
                        <comments :comments="comments" :isPreview = "isPreview" />
                    </div>

                    <span @click="showPostComments" v-if="commentsToLoad" class="actionButton viewMoreComments" >Load more {{commentsToLoad}} {{commentsToLoad  ? 'comments' : 'comment'}}</span>

                    <div class="replyBox">

                        <img class="profileAvatar" src="/public/assets/anonymus.png">
                        <textarea type="text" placeholder="Write a comment..."/>
                        <img src="https://image.flaticon.com/icons/svg/262/262597.svg">

                    </div>

                </div>

            </div>

        </div>

    </div>


</template>

<script>
import BrowserHelper from "modules/helpers/browser.helpers"
import Vote from "client/components/modules/vote/vote"
import Comments from "client/components/modules/comments/view/comments"
import PreviewImage from "client/components/UI/elements/preview-image"

import consts from "consts/consts"

export default {

    components: { Vote, Comments, PreviewImage },

    data(){
        return {
        }
    },

    props: {
        topic: null,
        isPage: false,
        comments: { default(){ return [] } },
        isPreview: false,
    },

    computed: {

        link(){
            return this.topic.link;
        },

        title(){
            return this.topic.title;
        },

        author(){
            return this.topic.author || 'Anonymous'
        },

        date(){
            return BrowserHelper.timeDiff(this.topic.date);
        },

        body(){
            return this.topic.body;
        },

        to(){
            return '/'+this.topic.slug;
        },

        vote(){
            return this.topic.vote || 0;
        },

        commentsToLoad(){
            return this.topic.comments - this.comments.length
        },

    },

    methods: {


        openStickyRightSidebarComment(){
            this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.topic.slug, channel: this.topic.channel })
        },

        showPostComments(){

            this.showComments = !this.showComments;

        }

    }

}
</script>

<style>

    .author a{
        padding-right: 0!important;
    }

</style>