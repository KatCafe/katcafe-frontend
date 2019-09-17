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

        let w,h, top, topHero;

        const addCommentForm = this.$refs['addCommentForm'].$el;

        const change = ()=>{

            w = window.innerWidth;

            top = window.pageYOffset || document.documentElement.scrollTop;

            if (w <= 800) {
                addCommentForm.style.position = "absolute";
                addCommentForm.style.bottom = -top+"px";
                addCommentForm.style.top = "inherit";
                addCommentForm.style.width = w+'px';
            }
            else {
                addCommentForm.style.position = "relative";

                topHero = document.getElementById("hero");
                if (topHero) topHero = topHero.clientHeight;
                else topHero = 0;

                addCommentForm.style.top = top - topHero + Math.max( -20, topHero - top ) +"px";
                addCommentForm.style.width = '100%';

            }


            console.log("w", w, "H", h, top );

        };

        change();

        BrowserHelpers.addEvent(window, 'scroll', e => change() );
        BrowserHelpers.addEvent(window, 'resize', e => change() );

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