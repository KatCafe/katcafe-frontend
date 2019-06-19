<template>

    <div>

        <div class="topic">

            <div class="topicBox" >

                <vote :vote="vote"/>

                <div class="topicContent" ref="topicContent">

                    <div class="author">
                        <span class="details authorName">{{author}}</span>

                        <span class="details">>></span>

                        <router-link :to="'/'+topic.channel">
                            <span class="actionButton">{{topic.channel}}</span>
                        </router-link>

                        <span class="details"> | </span>

                        <span class="details">{{date}} ago</span>

                        <div class="topicButtons">
                            <span class="postId">#{{ isPreview ? topic.uuid : 0}}</span>
                        </div>

                    </div>

                    <router-link :to="isPage ? '' : to">

                        <div class="topicBoxContent" :class="this.topic.preview ? 'hasImage' : ''">

                            <preview-image :data="this.topic.preview" />

                            <div class="topicTextWrap">
                                <h2 v-if="title" class="title">{{title}}</h2>

                                <p class="topicBody">{{body}}</p>

                            </div>

                        </div>

                    </router-link>

                    <div class="actionBox">

                        <span class="actionButton replayButton" @click="openStickyRightSidebarComment">Replay</span>

                        <span class="actionButton">Report</span>

                        <span class="actionButton">Share</span>

                        <a class="actionButton link" :href="topic.link" target="_blank" v-if="link">
                            <span class="actionButton">External Link</span>
                        </a>

                    </div>

                    <div class="replyBox">

                        <img src="/public/assets/anonymus.png">

                        <textarea type="text" placeholder="Add your reply..."/>

                    </div>

                    <div class="topicComments" v-if="this.comments" >
                        <comments :comments="comments" :isPreview = "isPreview" />
                    </div>

                    <span @click="showPostComments" v-if="topic.comments" class="actionButton viewMoreComments" >Load more {{topic.comments - this.CommentsAlreadyDisplayed}} {{topic.comments - this.CommentsAlreadyDisplayed > 1 ? 'comments' : 'comment'}}</span>

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
            CommentsAlreadyDisplayed: 0
        }
    },

    props: {
        topic: null,
        isPage: false,
        comments: { default(){ return [] } },
        isPreview: false,
    },

    computed: {
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


        link(){
            return BrowserHelper.processLink(this.topic.link || '');
        },

        to(){
            return '/'+this.topic.slug;
        },

        vote(){
            return this.topic.vote || 0;
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