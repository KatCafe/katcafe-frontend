<template>
    <div>

        <label for="flink">Share a Link or Upload a file</label> <br/>

        <span class="formLink" >
            <input style="width: 70%" type="text" id="flink" name="link" placeholder="Link" v-model="link" @change="linkChanged" >
            <input type="file" style="width: 30%; " value="or Select File" v-on:change="fileChanged" accept="image/*" >
        </span> <br/>

        <div>
            <img class="topicImage" v-if="preview" :src="preview.img">
        </div>

    </div>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"

export default {


    data() {
        return {
            link: '',
            file: '',
            preview: null,

            scraped: null,
        }
    },

    methods: {

        async linkChanged(e){

            try{

                if (!this.link) return;

                const out = await NetworkHelper.get('/scraper/'+this.link);

                if (out && out.result && out.scrape.image) {
                    this.preview = out.scrape.image;
                    this.scraped = out.scrape;
                    this.$emit('scraped', out.scrape)
                }


                this.file = undefined;

            }catch(err){
                this.preview = '';
            }

        },

        async fileChanged(e){

            const files = e.target.files || e.dataTransfer.files;
            if ( !files.length ) return;

            var reader = new FileReader();
            reader.onloadend = async (e) =>
                this.preview = {
                    img: reader.result
                };

            reader.readAsDataURL(files[0]);

            this.file = files[0];

            this.link = '';
            this.scraped = null;

        },

        reset(){
            this.link = '';
            this.file = '';
            this.preview = null;
        }

    }

}
</script>

<style>

</style>