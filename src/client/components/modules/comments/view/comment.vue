<template>

    <div class="topic">

        <div class="topicBox commentBox">

            <vote :vote="vote"/>

            <div ref="topicContent" class="topicContent">

                <div class="author">
                    <span>{{author}}</span>
                    <span>{{date}}</span>
                </div>

                <div class="topicImageWrap">
                    <img class="topicImage"  :src="toggledImage ? previewFull || preview : preview" :style="{maxHeight: maxHeight+'px', maxWidth: maxWidth+'px'}" @click="toggleImage">
                </div>

                <h2 class="title">{{title}}</h2>

                <span>{{link}}</span>

                <p class="topicBody">{{body}}</p>

            </div>

        </div>

        <div class="topicButtons">
            <span>Comments</span>
            <span>Share</span>
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

        }

    }

}
</script>