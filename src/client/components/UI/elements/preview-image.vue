<template>
    <div v-if="preview" class="topicImageWrap">
        <img class="topicImage" :src="preview.img" :style="{maxHeight: maxHeight+'px', maxWidth: maxWidth+'px'}" @mouseenter="showThumbnail" @mouseleave="hideThumbnail" @click="toggleImage" @load="imageLoaded">
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

            index: 0,
        }
    },

    computed:{

        preview(){

            if (!this.data ) return '';

            let img;
            if ( this.data.youtubeId ){

                if (this.index === 0)
                    img =  `https://i.ytimg.com/vi/${this.data.youtubeId}/0.jpg`;
                else
                    img =  `https://i.ytimg.com/vi/${this.data.youtubeId}/sd${this.index}.jpg`;

            } else img = typeof this.data.img === "string" ? this.data.img : this.data.img.img ;

            return {
                img: BrowserHelper.processRelativeLink(img),
            };
        },




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