<template>

    <div class="comment">

        <div class="topicBox commentBox">

            <vote  parentType="comment" :slug="slug" :parent="comment" :myvote="comment.myvote" />

            <div ref="topicContent" class="topicContent">

                <div class="author">
                    <span class="details authorName">{{author}}</span>
                    <span class="details">{{date}} </span>

                    <div class="topicButtons">
                        <span class="postId actionButton" @click="openStickyRightSidebarComment">Reply to #{{comment.uuid}}</span>
                    </div>

                </div>

                <div class="topicBoxContent" :class="this.comment.preview ? 'hasCommentImage' : ''">

                    <preview-image :data="this.comment.preview" :smaller="true" :link="link" :linkChars="'15'" />

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


    },

    methods: {

        openStickyRightSidebarComment(){

            this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.comment.topic, channel: this.comment.channel })

        }

    }

}
</script>