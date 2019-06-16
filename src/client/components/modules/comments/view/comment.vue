<template>

    <div class="topic">

        <div class="topicBox commentBox">

            <vote :vote="vote"/>

            <div class="topicContent">

                <div class="author">
                    <span>{{author}}</span>
                    <span>{{date}}</span>
                </div>

                <h2 class="title">{{title}}</h2>

                <span>{{link}}</span>

                <div>
                    <img class="topicImage topicImageWrap" :src="preview">
                    <p class="topicBody">{{body}}</p>
                </div>

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

            return this.comment.preview.img[0] === '/' ? consts.serverApi + this.comment.preview.img : this.comment.preview.img;
        },

        link(){
            const link = this.comment.link.replace('https://','').replace('http://').replace('www.','');
            return link.length < 30 ? link : link.substr(0, 30) + '...';
        },

        to(){
            return '/'+this.comment.slug;
        },

        vote(){
            return this.comment.vote || 0;
        },


    }

}
</script>