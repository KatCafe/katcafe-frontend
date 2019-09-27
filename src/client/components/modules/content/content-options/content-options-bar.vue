<template>

    <div class="content-options-bar">
        <div class="left">
            <span >VIEW</span>
            <icon :class="contentDisplay === 'topics' ? 'selected' : ''" icon="comment" @click="changeContentDisplay('topics')" />
            <icon :class="contentDisplay === 'comments' ? 'selected' : ''" icon="comments" @click="changeContentDisplay('comments')" />
        </div>
    </div>

</template>

<script>

import Icon from "client/components/UI/elements/icons/icon"

export default {

    components: {Icon},

    props: {},

    computed:{
        contentDisplay(){
            return this.$store.state.global.contentDisplay;
        },
    },

    methods:{

        changeContentDisplay(contentDisplay){
            return this.$store.dispatch('GLOBAL_CHANGE_CONTENT_DISPLAY', contentDisplay);
        }

    },

}
</script>

<style>

    .content-options-bar {
        display: block;
        background-color: #272626;
        border-color: #251f1f;
        border-style: solid;
        border-width: 1px 0 1px 0;

    }

    .content-options-bar .left{
        text-align: left;
        display: inherit;
    }

    .content-options-bar span{
        font-size: 12px;
    }

    .content-options-bar i{
        display: inline-block;
        font-size: 20px;

        padding: 8px 10px 8px 10px;
    }

    .content-options-bar  .selected{
        color: white;
    }

</style>