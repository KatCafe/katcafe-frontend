<template>

    <div class="right-sidebar sticky-sidebar" >

        <add-comment-form  ref="addCommentForm" :topic="stickyTopic||topic" :channel="stickyChannel||channel" :isShowPreview="isShowPreview" class="sticky-sidebar-content" />

    </div>
</template>

<script>

import AddCommentForm from "client/components/modules/content/comments/add-comment/add-comment.form"
import BrowserHelpers from "modules/helpers/browser.helpers";


export default {

    components: {AddCommentForm},

    props: {
        topic: {default: null},
        channel: {default: null},
    },

    data(){
        return {
            isShowPreview: true,
        }
    },

    mounted(){

        if (typeof window === "undefined") return;

        let w,h, top, topHero;

        const addCommentForm = this.$refs['addCommentForm'].$el;

        const change = ()=>{

            w = window.innerWidth;

            top = window.pageYOffset || document.documentElement.scrollTop;

            if (w <= 900) {
                addCommentForm.style.position = "fixed";
                addCommentForm.style.bottom = "0";
                addCommentForm.style.top = "inherit";
                addCommentForm.style.width = '100%';
                this.isShowPreview = false;
            }
            else {
                addCommentForm.style.position = "relative";

                topHero = document.getElementById("hero");
                if (topHero) topHero = topHero.clientHeight;
                else topHero = 0;

                addCommentForm.style.top = top - topHero + Math.max( -20, topHero - top ) +"px";
                addCommentForm.style.width = '100%';

                this.isShowPreview = true;
            }

        };

        change();

        BrowserHelpers.addEvent(window, 'scroll', e => change() );
        BrowserHelpers.addEvent(window, 'resize', e => change() );

    },

    computed:{

        stickyTopic(){
            return this.$store.state.global.topicStickyRightSidebarComment;
        },

        stickyChannel(){
            return this.$store.state.global.topicStickyRightSidebarComment;
        }

    },

    methods:{

        hideBar(){
            console.log('closed');
            this.$store.dispatch('GLOBAL_HIDE_STICKY_RIGHT_SIDEBAR_COMMENT')
        }

    }

}

</script>

<style>

    .sticky-sidebar {

    }


    .right-sidebar{
        width: 100%;
    }

    .sticky-sidebar-content {
        background-color: #3c3c3c;
        border-color: rgb(40, 35, 35);
        border-style: solid;
        border-width: 1px;
        z-index: 10;
    }

    .sticky-sidebar-content .new-topic-body {
        padding: 10px;
    }

    @media only screen and (max-width: 900px) {

        .sticky-sidebar-content .new-topic-body {
            padding: 5px;
        }

    }

</style>