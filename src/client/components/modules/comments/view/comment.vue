<template>

    <div class="comment">

        <div class="topicBox commentBox">

            <vote :vote="vote"/>

            <div ref="topicContent" class="topicContent">

                <div class="author">
                    <span>{{author}}</span>
                    <span>{{date}}</span>

                    <div class="topicButtons">
                        <a class="link" :href="comment.link" target="_blank" v-if="link">{{link}}</a>
                        <span @click="openStickyRightSidebarComment">Reply {{comment.uuid}}</span>
                    </div>

                </div>

                <preview-image :data="this.comment.preview" />

                <h3 v-if="title" class="title">{{title}}</h3>

                <p class="topicBody">{{body}}</p>

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
            toggledImage: false,
            maxHeight: 200,
            maxWidth: 150,
        }
    },

    props: {
        isPreview: false,
        comment: null,
    },

    computed: {
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
            return BrowserHelper.processLink(this.comment.link || '');
        },

        to(){
            return '/'+this.comment.slug;
        },

        vote(){
            return this.comment.vote || 0;
        },


    },

    methods: {

        openStickyRightSidebarComment(){

            this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.comment.topic, channel: this.comment.channel })

        }

    }

}
</script>