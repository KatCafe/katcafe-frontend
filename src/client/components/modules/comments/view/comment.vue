<template>

    <div class="topic">

        <div class="topicBox">

            <div class="votingBox">
                <div class="upvote"></div>
                <span>{{vote}} </span>
                <div class="downvote"></div>
            </div>

            <router-link :to="to">
                <div class="topicContent">

                    <div class="author">
                        <span>{{author}}</span>
                        <span>{{date}}</span>
                    </div>

                    <h2 class="title">{{title}}</h2>

                    <span>{{link}}</span>

                    <div>
                        <img class="topicImage topicImageWrap" :src="image">
                        <p class="topicBody">{{body}}</p>
                    </div>

                </div>
            </router-link>

        </div>

        <div class="topicButtons">
            <span>Comments</span>
            <span>Share</span>
        </div>

    </div>

</template>

<script>
import BrowserHelper from "modules/helpers/browser.helpers"
export default {

    props: {
        topic: null,
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

        image(){
            return this.topic.image||'https://cdn.publish0x.com/prod/fs/images/ca315de99837fa6ad66d02c3d843d7b0be48cd20768c708c595d276f63e14443.png';
        },

        link(){
            return this.topic.link.length < 30 ? this.topic.link : this.topic.link.substr(0, 30) + '...';
        },

        to(){
            return '/'+this.topic.slug;
        },

        vote(){
            return this.topic.vote || 0;
        },


    }

}
</script>