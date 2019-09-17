<template>

    <div class="comment">

        <div class="topicBox commentBox">

            <vote  parentType="comment" :slug="slug" :parent="comment" :myVote="comment.myVote" />

            <div ref="topicContent" class="topicContent">

                <div class="author">
                    <span class="details authorName">{{author}}</span>
                    <span class="details">{{date}} </span>

                    <img v-if="isUserOwner" @click="deleteComment" src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-edit-delete-icon.png" >

                    <div class="topicButtons">
                        <span class="postId actionButton" @click="openStickyRightSidebarComment">Reply to #{{comment.uuid}}</span>
                    </div>

                </div>

                <div class="topicBoxContent" :class="comment.preview ? 'hasCommentImage' : ''">

                    <preview-image :data="comment.preview" :smaller="true" :link="link" :linkChars="'15'" />

                    <div class="topicTextWrap">

                        <h3 v-if="title" class="title">{{title}}</h3>

                        <p class="topicBody">{{body}}</p>

                    </div>

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

export default {

    components: { Vote, PreviewImage },

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

        slug(){
            return this.comment.slug;
        },

        title(){
            return this.comment.title;
        },

        author(){
            return this.comment.author || 'Anonymous'
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
            return this.$store.getters.isUserOwner(this.comment);
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