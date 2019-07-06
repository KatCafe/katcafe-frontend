<template>
    <form action="/action_page.php" class="newPostContainer">

        Start a thread in <strong>{{channel}}</strong> <br/><br/>

        <div class="newPostContent">

            <div class="replyBox">

                <img class="profileAvatar" src="/public/assets/anonymus.png">
                <input type="text" placeholder="New post title" v-model="topicTitle" @change="titleChanged"/>

                <input type="file" style="display: none; " value="or Select File" v-on:change="fileChanged" accept="image/*" ref="refFileInput" >

                <img class="uploadPhoto" src="/public/assets/uploadPhoto.svg" @click="openFileUpload">

            </div>

            <div class="messageBox">

                <div></div>

                <textarea type="text" placeholder="Your comment..." v-model="topicBody" @change="bodyChanged"/>

                <div></div>

            </div>

        </div>

        <captcha ref="captcha" @submit="createTopic" buttonText="Submit Topic" />

        <div v-if="error" class="alert-box error"><span>error <br/><br/> </span> {{error}}</div>
        <loading-spinner v-if="loading" />

        <div v-if="showPreview && !loading" >
            Preview
            <topic :topic="previewTopic" :isSnippetForm="true" />
        </div>

    </form>
</template>

<script>
import NetworkHelper from "modules/network/network-helper"
import Captcha from "client/components/modules/captcha/captcha"
import Topic from "client/components/modules/topics/view/topic"
import StringHelper from "src/utils/string-helper"
import LoadingSpinner from "client/components/UI/elements/loading-spinner"


function initialState (){
    return {
        topicTitle: '',
        topicBody: '',

        link: '',
        _prevLink: '',

        file: undefined,

        scraped: null,

        error : '',
        loading: false,

        previewTopic:{
            title: '',
            body: '',
            slug: '',
            date: new Date().getTime(),

            link: '',
            preview: null,
        }

    }
}

export default {

    components: { Captcha, Topic, LoadingSpinner },

    props: {
        topicChannel: '',
    },

    data(){
        return initialState();
    },

    computed:{

        channel(){
            if (this.topicChannel ) return this.topicChannel;
            if (this.$store.state.channels.channel) return this.$store.state.channels.channel.slug;
            return '';
        },

        author(){
            return '';
        },

        title(){
            return this.topicTitle || ( this.scraped ? this.scraped.title : ''  ) || '';
        },

        body(){
            return this.topicBody   || ( this.scraped ? this.scraped.description : ''  ) || '';
        },

        showPreview(){
            return this.title.length || this.body.length || this.previewTopic.preview;
        }

    },

    methods: {

        async extractLink(){

            let links = StringHelper.findLinks(this.topicTitle);
            let links2 = StringHelper.findLinks(this.topicBody);

            links = links.concat(links2);

            if (!links.length ) return;

            links = links.map( it => StringHelper.fixURL( it ) );

            this.link = links[0];

            await this.linkChanged();

            this.topicTitle = this.topicTitle.replace(this.link, '');
            this.topicBody = this.topicBody.replace(this.link, '');

        },

        async linkChanged(e){

            this.loading = true;

            try{

                if (!this.link) return;
                if (this.link === this._prevLink) return;

                this._prevLink = this.link;

                const out = await NetworkHelper.post('/scraper/get',{
                    uri: this.link,
                });

                console.log(out);

                if (out && out.result && (out.scrape.image || out.scrape.title || out.scrape.description ) ) {

                    if (out.scrape.uri) {
                        this._prevLink = out.scrape.uri;
                        this.link = out.scrape.uri;
                    }

                    this.scraped = out.scrape;
                    this.$emit('scraped', out.scrape)
                }

            }catch(err){
                console.error(err);
                this.scraped = null;
            }

            this.loading = false;

        },

        async fileChanged(e){

            const files = e.target.files || e.dataTransfer.files;
            if ( !files.length ) return;

            const reader = new FileReader();
            reader.onloadend = async (e) => {

                this.file = {
                    file: files[0],
                    preview: {
                        img: reader.result
                    }
                };
            };

            reader.readAsDataURL(files[0]);

        },

        async createTopic(e, resolve){

            const captcha = this.$refs['captcha'];

            try{

                this.error = '';

                const out = await NetworkHelper.post('/topics/create', {
                    channel: this.channel,
                    title: this.title,
                    body: this.body,
                    link: this.link,
                    file: this.file ? {
                        name: this.file.file.name,
                        base64: this.file.preview.img,
                    } : undefined,
                    author: this.author,
                    captcha: {
                        solution: captcha.captchaInput,
                        encryption: captcha.captcha.encryption,
                    }
                });

                captcha.reset();

                this.reset();

                this.$router.push({path: '/'+out.topic.slug });


            }catch(err){

                console.log(err);

                this.error = err.message;

                if (this.error.indexOf("Captcha was already used") >= 0 || this.error.indexOf("Captcha is incorrect") >= 0 )
                    captcha.reset();

            }

            e.stopPropagation();

            resolve(true);

        },

        reset(){
            Object.assign(this.$data, initialState());
        },

        openFileUpload(){
            this.$refs['refFileInput'].click();
        },

        titleChanged(){
            this.extractLink();
        },

        bodyChanged(){
            this.extractLink();
        },

        updatePreviewTopic(){

            this.previewTopic.title = this.title;
            this.previewTopic.body = this.body;
            this.previewTopic.link = this.link;
            this.previewTopic.channel = this.channel;

            this.previewTopic.preview = undefined;

            if (this.scraped && this.scraped.image)
                this.previewTopic.preview = Object.assign( {
                    link: this.link
                }, this.scraped.image);

            if (this.file)
                this.previewTopic.preview = {
                    base64: this.file.preview,
                    link: this.file.file.name,
                };

            this.previewTopic.author = this.author;

        }

    },

    watch: {
        topicChannel: function (newValue, oldValue) {
            this.updatePreviewTopic();
        },
        topicTitle: function (newValue, oldValue) {
            this.updatePreviewTopic();
        },
        topicBody: function (newValue, oldValue) {
            this.updatePreviewTopic();
        },
        scraped: function (newValue, oldValue) {
            this.updatePreviewTopic();
        },
        file: function (newValue, oldValue) {
            this.updatePreviewTopic();
        },
    },

}
</script>

<style>

</style>