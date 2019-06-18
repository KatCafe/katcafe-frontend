<template>
    <div>

        <label for="flink">Share a Link or Upload a file</label> <br/>

        <span class="formLink" >
            <input style="width: 70%" type="text" id="flink" name="link" placeholder="Link" v-model="link" @change="linkChanged" >
            <input type="file" style="width: 30%; " value="or Select File" v-on:change="fileChanged" accept="image/*" >
        </span> <br/>

        <div>
            <img class="topicImage" v-if="getPreview" :src="getPreview.img" @mouseenter="showThumbnail" @mouseleave="hideThumbnail">
        </div>

    </div>
</template>

<script>

import BrowserHelper from "modules/helpers/browser.helpers"
import NetworkHelper from "modules/network/network-helper"

export default {


    data() {
        return {
            link: '',
            prevLink: '',

            file: '',

            thumbnailVisible: false,

            scraped: null,
        }
    },

    computed:{

        getPreview(){

            if (!this.scraped || !this.scraped.image) return '';

            let img;
            if ( this.scraped.image.thumbnail ){

                if (this.thumbnailVisible) img =  this.scraped.image.thumbnail;
                else img = this.scraped.image.img;

            } else img = this.scraped.image;

            return BrowserHelper.processRelativeLink( img );
        },

    },

    methods: {

        async linkChanged(e){

            try{

                if (!this.link) return;
                if (this.link === this.prevLink) return;

                this.prevLink = this.link;

                const out = await NetworkHelper.post('/scraper/get',{
                    uri: this.link,
                });

                if (out && out.result && out.scrape.image) {

                    if (out.scrape.uri) {
                        this.prevLink = out.scrape.uri;
                        this.link = out.scrape.uri;
                    }

                    this.scraped = out.scrape;
                    this.$emit('scraped', out.scrape)
                }


                this.file = undefined;

            }catch(err){
                console.error(err);
                this.scraped = null;
            }

        },

        async fileChanged(e){

            const files = e.target.files || e.dataTransfer.files;
            if ( !files.length ) return;

            var reader = new FileReader();
            reader.onloadend = async (e) =>
                this.scraped = {
                    img: {
                        img: reader.result
                    }
                };

            reader.readAsDataURL(files[0]);

            this.file = files[0];

            this.link = '';
            this.scraped = null;

        },

        reset(){
            this.link = '';
            this.file = '';
            this.scraped = null;
        },

        showThumbnail(){
            if (this.scraped.image.thumbnail)
                this.thumbnailVisible = true;
        },

        hideThumbnail(){
            if (this.scraped.image.thumbnail)
                this.thumbnailVisible = false;
        }

    }

}
</script>

<style>

</style>