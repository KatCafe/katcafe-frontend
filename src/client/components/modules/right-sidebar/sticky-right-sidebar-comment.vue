<template>

    <div class="rightSidebar stickySidebar" >


        <add-comment-form  ref="addCommentForm" :topic="topic" :channel="channel"  />

    </div>
</template>

<script>

import AddCommentForm from "client/components/modules/comments/add-comment.form"
import BrowserHelpers from "modules/helpers/browser.helpers";


export default {

    components: {AddCommentForm},

    props: {
    },

    mounted(){

        if (typeof window === "undefined") return;

        const addCommentForm = this.$refs['addCommentForm'].$el;
        console.log(addCommentForm);
        addCommentForm.style.position = "relative";

        var top = window.pageYOffset || document.documentElement.scrollTop;
        var topHero = document.getElementById("hero");
        if (topHero) topHero = topHero.clientHeight;
        else topHero = 0;

        addCommentForm.style.top = top - topHero + Math.max( -20, topHero - top ) +"px";

        BrowserHelpers.addEvent(window, 'scroll', (e)=>{
            topHero = document.getElementById("hero");
            if (topHero) topHero = topHero.clientHeight;
            else topHero = 0;

            var top = window.pageYOffset || document.documentElement.scrollTop;

            addCommentForm.style.top = top - topHero + Math.max( -20, topHero - top ) +"px";
        })

    },

    computed:{

        topic(){
            return this.$store.state.global.topicStickyRightSidebarComment;
        },

        channel(){
            return this.$store.state.global.channelStickyRightSidebarComment;
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