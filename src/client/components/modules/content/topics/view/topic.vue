<template>


    <div class="topic">

        <vote parentType="topic" :slug="slug" :parent="topic" :myVote="topic.myVote" />

        <div >

            <div class="topic-body">
                <div :class="`author ${ seen ? '' : 'unread'}`">

                    <span :class="`details bold ${authorClass}  `">{{author}}</span>

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

                    <router-link :to="to" :tag="isPage ? 'div' : 'a'" :disabled="isPage">

                        <div class="topic-text-wrap">

                            <h2 v-if="title" class="title word-wrap" v-html="title"/>

                            <read-more  :text="body" :max-chars="400" pclass="body word-wrap" />

                        </div>
                    </router-link>

                </div>
            </div>

            <way-point @shown="wasShown" :distance="0" :checkVisible="true" :enabled="waypointEnabled" />

            <social-media v-if="isPage" :topic="title" :description="body" />

            <add-comment-from v-if="isPage && comments.length > 8" :topic="this.topic" class="hiddenTablet hiddenMobile" :isPage="isPage" />

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
import AddCommentFrom from "client/components/modules/content/comments/add-comment/add-comment.form"
import ReadMore from "client/components/UI/elements/read-more"
import ViewMoreComments from "./view-more-comments"
import Icon from "client/components/UI/elements/icons/icon"

import consts from "consts/consts"
import SocialMedia from "client/components/UI/elements/social-media"
import WayPoint from "client/components/UI/elements/waypoint/way-point"

export default {

    components: { Vote, Comments, PreviewImage, AddCommentFrom, ReadMore, ViewMoreComments, Icon, SocialMedia, WayPoint },

    props: {
        topic: null,
        isPage: false,
        isPreview: false,
        isSnippetForm: false,
    },

    data(){
        return {
            seen: true,
            waypointEnabled: false,
        }
    },

    mounted(){

        if (typeof window === "undefined") return;

        const seen = localStorage.getItem('seenTopic:'+this.topic.slug);
        if ( !seen  ) this.seen = false;

        this.waypointEnabled = true;

    },

    computed: {

        channel(){
            return this.$store.state.channels.channel;
        },

        link(){
            return this.topic.link;
        },

        title(){
            const title = (this.topic ? this.topic.title : '')||'';
            return title.length > 200 ? title.substr(0, 200)+'...' : title;
        },

        author(){
            const author = (this.topic.owner && !this.topic.isAnonymous ) ? this.topic.owner : '';
            return author || this.$i18n.t('comment.anonymous');
        },

        isRealAuthor(){
            return this.author !== this.$i18n.t('comment.anonymous');
        },

        authorClass(){
            if (this.isRealAuthor) return 'normal';
            return '';
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
        },

        wasShown(){
            localStorage.setItem('seenTopic:'+this.topic.slug, new Date().getTime() );
        },

    }

}
</script>

<style>



</style>