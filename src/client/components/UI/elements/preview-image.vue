<template>
    <div v-if="preview" class="topicImageWrap">

        <img class="topicImage hiddenMobile" :style="{maxHeight: maxHeight+'px',   maxWidth: maxWidth+'px'}"  :src="preview.img" @mouseenter="showThumbnail" @mouseleave="hideThumbnail" @click="toggleImage" @load="imageLoaded">

        <img class="topicImage hiddenDesktop"  :src="preview.img">

        <a v-if="link" :href="link" target="_blank" class="topicPreviewLink actionButton">
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

            if (!this.data ) return '';

            let img;

            if ( this.data.base64 ) return this.data.base64;
            else
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

            e.preventDefault();

            this.toggledImage = !this.toggledImage;

        },

    }

}

</script>