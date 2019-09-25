<template>

    <div>



    </div>


</template>

<script>
import BrowserHelper from "modules/helpers/browser.helpers"
import Vote from "client/components/modules/vote/vote"
import Comments from "client/components/modules/comments/view/comments"
import PreviewImage from "client/components/UI/elements/preview-image"

import consts from "consts/consts"

export default {

    components: { Vote, Comments, PreviewImage },

    data(){
        return {
            showComments: false
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
            return this.topic.author || $t('comment.anonymous')
        },

        date(){
            return BrowserHelper.timeDiff(this.topic.date);
        },

        body(){
            return this.topic.body;
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


        openStickyRightSidebarComment(){
            this.$store.dispatch('GLOBAL_SHOW_STICKY_RIGHT_SIDEBAR_COMMENT', {value: true, topic: this.topic.slug, channel: this.topic.channel })
        },

        showPostComments(){

            this.showComments = !this.showComments;

        }

    }

}
</script>

<style>

    .author a{
        padding-right: 0!important;
    }

</style>