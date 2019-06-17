<template>

    <div class="topic comment">

        <div class="topicBox commentBox">

            <vote :vote="vote"/>

            <div ref="topicContent" class="topicContent">

                <div class="author">
                    <span>{{author}}</span>
                    <span>{{date}}</span>

                    <div class="topicButtons">
                        <a class="link" :href="this.comment.link" target="_blank" v-if="link">{{link}}</a>
                        <span @click="showStickyRightSidebarComment">Reply 0</span>
                    </div>

                </div>

                <div v-if="getPeview" class="topicImageWrap">
                    <img class="topicImage"  :src="getPeview" :style="{maxHeight: maxHeight+'px', maxWidth: maxWidth+'px'}" @click="toggleImage">
                </div>

                <h3 v-if="title" class="title">{{title}}</h3>

                <p class="topicBody">{{body}}</p>

            </div>

        </div>


    </div>

</template>

<script>
import BrowserHelper from "modules/helpers/browser.helpers"
import Vote from "client/components/modules/vote/vote"
import consts from "consts/consts"

export default {

    components: { Vote },

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

        getPeview(){
            return this.toggledImage ? this.previewFull || this.preview : this.preview
        },

        preview(){
            if (!this.comment.preview) return '';
            return BrowserHelper.processRelativeLink(this.comment.preview.img);
        },

        previewFull(){
            if (!this.comment.preview) return '';
            return BrowserHelper.processRelativeLink(this.comment.preview.full);
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

        toggleImage(e){

            e.preventDefault();

            this.toggledImage = !this.toggledImage;

            if (this.toggledImage){


                this.maxHeight = 600;
                this.maxWidth = this.$refs['topicContent'].clientWidth;

            } else {

                this.maxHeight = 200;
                this.maxWidth = 150;

            }

        },

        showStickyRightSidebarComment(){

            this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.comment.topic, channel: this.comment.channel })

        }

    }

}
</script>