<template>
    <div>

        <div :class="visible ? 'show-content' : 'hide-content'" ref="ref-div-content" :style="`${ visible ? '' : 'maxHeight: '+maxHeight+'px' }`">
            <p v-html="text" :class="`readMore ${pclass}`"></p>
        </div>

        <template v-if="isMore">
            <a href="javascript:void(0)" v-if="!visible " @click="showMore"> show more</a>
            <a href="javascript:void(0)" v-if="visible" @click="showLess"> show less</a>
        </template>

    </div>
</template>

<script>
export default {

    props: {
        text: {default: ''},
        maxHeight: {default: 150},
        pclass: {default: ''},
    },

    data(){
        return {
            visible: false,
            isMore: false,
        };
    },

    methods: {

        showMore(e){
            if (e) e.preventDefault();
            this.visible = true;
        },

        showLess(e){
            if (e) e.preventDefault();
            this.visible = false;
        }

    },

    mounted(){

        if (typeof window === "undefined") return;

        if (this.$refs['ref-div-content'].clientHeight >= this.maxHeight)
            this.isMore = true;

    }

}
</script>

<style>
    .readMore{
        display: inline;
        padding-left: 0 !important;
    }

    .hide-content {
        overflow: hidden;
    }

    .show-content{

    }

    .show-content {
        height: auto;
    }

</style>