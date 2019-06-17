<template>

    <div>

        <div class="topic">

            <div class="topicBox" >

                <vote :vote="vote"/>


                    <div class="topicContent" ref="topicContent">

                        <div class="author">
                            <span>{{author}}</span>
                            <span>{{date}}</span>
                            <router-link :to="'/'+this.topic.channel">
                                <span>{{this.topic.channel}}</span>
                            </router-link>

                            <div class="topicButtons">
                                <a class="link" :href="this.topic.link" target="_blank" v-if="link"> {{link}} </a>
                                <span @click="showStickyRightSidebarComment">Reply 0</span>
                            </div>

                        </div>

                        <router-link :to="isPage ? '' : to">

                            <div v-if="getPeview" class="topicImageWrap">
                                <img class="topicImage"  :src="getPeview" :style="{maxHeight: maxHeight+'px', maxWidth: maxWidth+'px'}" @click="toggleImage">
                            </div>

                            <div class="topicTextWrap">
                                <h2 v-if="title" class="title">{{title}}</h2>

                                <p class="topicBody">{{body}}</p>
                            </div>

                        </router-link>


                    </div>


            </div>

        </div>

        <div class="topicComments" >
            <comments :comments="comments" :isPreview = "isPreview" />
        </div>

        <div class="topicSeparator">

        </div>

    </div>


</template>

<script>
import BrowserHelper from "modules/helpers/browser.helpers"
import Vote from "client/components/modules/vote/vote"
import Comments from "client/components/modules/comments/view/comments"

import consts from "consts/consts"

export default {

    components: { Vote, Comments },

    data(){
        return {
            toggledImage: false,
            maxHeight: 200,
            maxWidth: 150,
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

        getPeview(){
            return this.toggledImage ? this.previewFull || this.preview : this.preview
        },

        preview(){
            if (!this.topic.preview) return '';
            return BrowserHelper.processRelativeLink(this.topic.preview.img);
        },

        previewFull(){
            if (!this.topic.preview) return '';
            return BrowserHelper.processRelativeLink(this.topic.preview.full);
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

            this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.topic.slug, channel: this.topic.channel })

        }

    }

}
</script>