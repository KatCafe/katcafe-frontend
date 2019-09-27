<template>

    <div class="topic comment ">

        <vote parentType="comment" :slug="slug" :parent="comment" :myVote="comment.myVote" />

        <div class="topic-content comment-content">

            <div class="author">
                <span class="details bold">{{author}}</span>
                <span class="details">{{date}} </span>

                <div class="topic-buttons comment-buttons">
                    <img v-if="isUserOwner" @click="deleteComment" src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-edit-delete-icon.png" >
                    <span class="topic-reply-id" @click="openStickyRightSidebarComment"> #{{comment.uuid}}</span>
                </div>

            </div>

            <div class="topic-content" :class="comment.preview ? 'topic-has-image comment-has' : ''">

                <preview-image :data="comment.preview" :smaller="true" :link="link" :linkChars="'15'" />

                <div class="topic-text-wrap">

                    <h3 v-if="title" class="title" v-html="title"/>

                    <read-more :text="body" :max-chars="400" pclass="body" />

                </div>

            </div>

        </div>


    </div>

</template>

<script>
import BrowserHelper from "modules/helpers/browser.helpers"
import Vote from "client/components/modules/vote/vote"
import PreviewImage from "client/components/UI/elements/preview-image"
import consts from "consts/consts"
import ReadMore from "client/components/UI/elements/read-more"

export default {

    components: { Vote, PreviewImage, ReadMore},

    data(){
        return {
        }
    },

    props: {
        isPreview: false,
        isSnippetForm: false,
        comment: null,
    },

    computed: {

        channel(){
            return this.$store.state.channels.channel;
        },

        topic(){
            return this.$store.state.topics.topic;
        },

        slug(){
            return this.comment.slug;
        },

        title(){
            return this.comment.title;
        },

        author(){
            return this.comment.author || this.$i18n.t('comment.anonymous')
        },

        date(){
            return BrowserHelper.timeDiff(this.comment.date);
        },

        body(){
            return this.comment.body;
        },

        link(){
            return this.comment.link;
        },

        to(){
            return '/'+this.comment.slug;
        },

        isUserOwner(){
            return this.$store.getters.isUserOwner( [this.channel, this.topic, this.comment] );
        }

    },

    methods: {

        openStickyRightSidebarComment(){
            return this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.comment.topic, channel: this.comment.channel })
        },

        deleteComment(){
            return this.$store.dispatch('COMMENT_DELETE', this.comment.slug );
        }


    }

}
</script>
