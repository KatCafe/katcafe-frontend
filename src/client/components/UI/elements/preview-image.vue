<template>
        <div v-if="preview" class="preview-image-wrap">

            <img class="hiddenMobile" :style="{maxHeight: maxHeight+'px',   maxWidth: maxWidth+'px'}"  :src="preview.img" @mouseenter="showThumbnail" @mouseleave="hideThumbnail" @click="toggleImage" @load="imageLoaded">

            <img class="hiddenDesktop"  :src="preview.img">

            <a v-if="link" :href="link" target="_blank">
                {{linkPreview}}
            </a>

        </div>

</template>

<script>

import BrowserHelper from "modules/helpers/browser.helpers"

export default {

    props: {
        data: undefined,
        smaller: false,
        link: '',
        linkChars: {default: 25 },
    },

    data(){
        return {
            toggledImage: false,
            thumbnailVisible: false,
            index: 0,
        }
    },

    computed:{

        linkPreview(){
            return BrowserHelper.processLink(this.link || '', this.linkChars);
        },


        preview(){
            return this.$store.getters.getPreviewImage(this.data, this.toggledImage, this.index)
        },

        maxWidth(){

            if (this.toggledImage) return 728;

            return this.smaller ? 110 : 150;

        },

        maxHeight(){

            if (this.toggledImage) return 600;

            return this.smaller ? 110 : 200;

        }

    },

    methods:{

        showThumbnail(){
            if (this.data.youtubeId) {

                this.index = 1;
                this.thumbnailVisible = true;

            }
        },

        hideThumbnail(){
            if (this.data.youtubeId) {

                this.index = 0;
                this.thumbnailVisible = false;
                clearTimeout(this._timeoutThumbnail);
            }
        },

        imageLoaded(){

            if (this.thumbnailVisible){

                if (this.data.youtubeId)
                    this._timeoutThumbnail = setTimeout( ( )=> {
                        this.index = ( this.index + 1 ) % 4;
                    }, 1000 );

            }

        },

        toggleImage(e){

            if(e) e.preventDefault();

            this.toggledImage = !this.toggledImage;

        },

    }

}

</script>

<style>

    .preview-image-wrap{
        display: inherit;
        float: left;
        padding-bottom: 3px;
        cursor: pointer;
        z-index: 10;
        padding-right: 10px;
        margin-bottom: 10px;
    }

    .preview-image-wrap img{
        max-width: 150px;
        max-height: 200px;
    }

    .preview-image-wrap a{
        white-space: nowrap;
        font-size: 11px;
        margin-top: 3px;
    }

    @media only screen and (max-width: 600px) {

        .preview-image-wrap img{
            width: 100%;
            max-width: 1000px;
            max-height: 1000px;
            min-width: 0;
            min-height: 0;
            height: auto;
        }

    }

</style>