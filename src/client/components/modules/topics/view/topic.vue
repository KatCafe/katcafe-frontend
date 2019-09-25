<template>


    <div class="topic">

        <div class="topicBox" >

            <vote parentType="topic" :slug="slug" :parent="topic" :myVote="topic.myVote" />

            <div class="topicContent" ref="topicContent">

                <div class="author">

                    <span class="details authorName">{{author}}</span>

                    <span class="details">{{date}} </span>

                    <router-link :to="'/'+(topic.channel||'')">
                        <span class="actionButton">{{topic.channel||''}}</span>
                    </router-link>

                    <img v-if="isUserOwner" @click="deleteTopic" src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-edit-delete-icon.png" >


                </div>

                <div class="topicBoxContent" :class="this.topic.preview ? 'topicHasImage' : ''">

                    <preview-image :data="this.topic.preview" :link="link" />

                    <router-link :to="isPage ? '' : to">

                        <div class="topicTextWrap">

                            <h2 v-if="title" class="title" v-html="title"/>

                            <read-more  :text="body" :max-chars="400" pclass="topicBody" />

                        </div>
                    </router-link>

                </div>

                <template v-if="isPage && comments.length > 8">
                    <add-comment-from :topic="this.topic" class="hiddenTablet hiddenMobile" />
                </template>

                <div class="topicComments" v-if="comments.length" @click.native="window.scrollTo(0,0)" >
                    <comments :comments="comments" :isPreview = "isPreview" />
                </div>

                <router-link :to="isPage ? '' : to" v-if="commentsToLoad && !isPage">
                    <span v-if="commentsToLoad >= 0" class="actionButton viewMoreComments" @click="viewMoreComments"> View more {{commentsToLoad}} comment{{commentsToLoad > 1  ? 's' : ''}} </span>
                </router-link>

                <template v-if="!isSnippetForm && isPreview ">
                    <add-comment-from :topic="this.topic" />
                </template>

                <template v-if="isPage">
                    <add-comment-from :topic="this.topic" class="hiddenTablet hiddenMobile" />
                </template>

            </div>

        </div>

    </div>


</template>

<script>
import BrowserHelper from "modules/helpers/browser.helpers"
import Vote from "client/components/modules/vote/vote"
import Comments from "client/components/modules/comments/view/comments"
import PreviewImage from "client/components/UI/elements/preview-image"
import AddCommentFrom from "client/components/modules/comments/add-comment.form"
import ReadMore from "client/components/UI/elements/read-more"

import consts from "consts/consts"

export default {

    components: { Vote, Comments, PreviewImage, AddCommentFrom, ReadMore },

    props: {
        topic: null,
        isPage: false,
        isPreview: false,
        isSnippetForm: false,
    },

    computed: {

        channel(){
            return this.$store.state.channels.channel;
        },

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

        slug(){
            return this.topic.slug;
        },

        commentsToLoad(){
            return this.topic.comments - this.comments.length
        },

        comments(){
            return this.$store.getters.getComments( this.isPage ? 'date' : 'hot', this.isPage ? -1 : 1, it => it.topic === this.topic.slug );
        },

        isUserOwner(){
            return this.$store.getters.isUserOwner( [this.channel, this.topic] );
        }

    },

    methods: {


        openStickyRightSidebarComment(){
            return this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.topic.slug, channel: this.topic.channel })
        },

        viewMoreComments(){
            return this.$store.dispatch('TOPIC_GET_MORE_COMMENTS', {value: true, topic: this.topic.slug, channel: this.topic.channel })
        },

        deleteTopic(){
            return this.$store.dispatch('TOPIC_DELETE', this.topic.slug );
        }

    }

}
</script>

<style>

    .author a{
        padding-right: 0!important;
    }

</style>