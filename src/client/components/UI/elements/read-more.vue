<template>
    <div>

        <p v-html="text.length > maxChars ? ( visible ? text : text.substr(0, maxChars) + '...'  ) : text " :class="`readMore ${pclass}`"></p>

        <a href="javascript:void(0)" v-if="!visible && text.length > maxChars" @click="showMore">show more</a>
        <a href="javascript:void(0)" v-if="visible && text.length > maxChars" @click="showLess">show less</a>

    </div>
</template>

<script>
export default {

    props: {
        text: {default: ''},
        maxChars: {default: 400},
        pclass: {default: ''},
    },

    data(){
        return {
            visible: false
        };
    },

    methods: {

        showMore(){
            this.visible = true;
        },

        showLess(){
            this.visible = false;
        }

    },

}
</script>

<style>
    .readMore{
        display: inline;
        padding-left: 0 !important;
    }
</style>