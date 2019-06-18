<template>
    <div v-if="preview" class="topicImageWrap">
        <img class="topicImage" :src="preview.img" :style="{maxHeight: maxHeight+'px', maxWidth: maxWidth+'px'}" @mouseenter="showThumbnail" @mouseleave="hideThumbnail" @click="toggleImage">
    </div>
</template>

<script>

import BrowserHelper from "modules/helpers/browser.helpers"

export default {

    props: {
        data: undefined,
    },

    data(){
        return {
            toggledImage: false,
            maxHeight: 200,
            maxWidth: 150,

            thumbnailVisible: false,
        }
    },

    computed:{

        preview(){

            if (!this.data ) return '';

            let img;
            if ( this.data.thumbnail ){

                if (this.thumbnailVisible) img =  this.data.thumbnail;
                else img = this.data.img;

            } else img = this.data;

            return BrowserHelper.processRelativeLink( img );
        },




    },

    methods:{

        showThumbnail(){
            if (this.data.thumbnail)
                this.thumbnailVisible = true;
        },

        hideThumbnail(){
            if (this.data.thumbnail)
                this.thumbnailVisible = false;
        },


        toggleImage(e){

            e.preventDefault();

            this.toggledImage = !this.toggledImage;

            if (this.toggledImage){


                this.maxHeight = 600;
                this.maxWidth = 500;

            } else {

                this.maxHeight = 200;
                this.maxWidth = 150;

            }

        },

    }

}

</script>