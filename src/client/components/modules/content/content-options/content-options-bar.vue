<template>

    <div class="content-options-bar">
        <div :class="`left ${pclass} center` ">
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

    props: {
        pclass: {default: ''},
    },

    computed:{
        contentDisplay(){
            return this.$store.state.content.contentDisplay;
        },
    },

    methods:{

        changeContentDisplay(contentDisplay){
            return this.$store.dispatch('CONTENT_CHANGE_DISPLAY', contentDisplay);
        }

    },

}
</script>

<style>

    .content-options-bar {
        background-color: var(--header-bg-color);
        border-bottom: solid 1px var(--header-border-color);

        display: block;
        padding-left: 10px;
    }

    .content-options-bar .left{
        text-align: left;
        display: -webkit-box;
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
        color: var(--a-link-hover);
    }

</style>