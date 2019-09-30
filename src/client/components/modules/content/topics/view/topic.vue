<template>


    <div class="topic">

        <vote parentType="topic" :slug="slug" :parent="topic" :myVote="topic.myVote" />

        <div class="topic-content" >

            <div class="author">

                <span class="details bold">{{author}}</span>

                <span class="details">{{date}} </span>

                <router-link :to="'/'+(topic.channel||'')">
                    <span class="action-button">{{topic.channel||''}}</span>
                </router-link>

                <div class="topic-buttons">
                    <icon v-if="isUserOwner" icon="times" @click="deleteTopic" class="delete" />
                </div>

            </div>

            <div class="topic-content" :class="this.topic.preview ? 'topic-has-image' : ''">

                <preview-image :data="this.topic.preview" :link="link" />

                <router-link :to="isPage ? '' : to">

                    <div class="topic-text-wrap">

                        <h2 v-if="title" class="title" v-html="title"/>

                        <read-more  :text="body" :max-chars="400" pclass="body" />

                    </div>
                </router-link>

            </div>

            <social-media v-if="isPage" />

            <add-comment-from v-if="isPage && comments.length > 8" :topic="this.topic" class="hiddenTablet hiddenMobile" :isPage="isPage" style="margin-bottom: 20px" />

            <div class="topic-comments" v-if="comments.length" >
                <comments :comments="comments" :isPreview = "isPreview" />
            </div>

            <view-more-comments :topic="topic" :comments="comments" :isPage="isPage" />

            <add-comment-from v-if="!isSnippetForm && isPreview " :topic="this.topic" />

            <add-comment-from v-if="isPage" :topic="this.topic" class="hiddenTablet hiddenMobile" :isPage="isPage" />

        </div>

    </div>


</template>

<script>
import BrowserHelper from "modules/helpers/browser.helpers"
import Vote from "client/components/modules/vote/vote"
import Comments from "client/components/modules/content/comments/view/comments"
import PreviewImage from "client/components/UI/elements/preview-image"
import AddCommentFrom from "client/components/modules/content/comments/add-comment.form"
import ReadMore from "client/components/UI/elements/read-more"
import ViewMoreComments from "./view-more-comments"
import Icon from "client/components/UI/elements/icons/icon"

import consts from "consts/consts"
import SocialMedia from "client/components/UI/elements/social-media"


export default {

    components: { Vote, Comments, PreviewImage, AddCommentFrom, ReadMore, ViewMoreComments, Icon, SocialMedia },

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
            return this.topic.author || this.$i18n.t('comment.anonymous')
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


        deleteTopic(){
            return this.$store.dispatch('TOPIC_DELETE', this.topic );
        }

    }

}
</script>

<style>



</style>