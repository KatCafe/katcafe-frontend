<template>

    <div>

        <div class="topic">

            <div class="topicBox" >

                <vote :vote="vote"/>


                    <div class="topicContent" ref="topicContent">

                        <div class="author">
                            <span>{{author}}</span>
                            <span>{{date}}</span>
                            <a :href="this.topic.link" target="_blank" v-if="link">
                                <span>{{link}}</span>
                            </a>
                        </div>

                        <router-link :to="isPage ? '' : to">

                            <div class="topicImageWrap">
                                <img class="topicImage"  :src="toggledImage ? previewFull || preview : preview" :style="{maxHeight: maxHeight+'px', maxWidth: maxWidth+'px'}" @click="toggleImage">
                            </div>

                            <div>
                                <h2 class="title">{{title}}</h2>

                                <p class="topicBody">{{body}}</p>
                            </div>
                        </router-link>


                    </div>


            </div>

            <div class="topicButtons">
                <span>Comments</span>
                <span>Share</span>
            </div>

        </div>

        <div style="padding-left: 20px">
            <comments :comments="comments" />
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
        comments: {
            default(){
                return []
            }
        }
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

        }

    }

}
</script>