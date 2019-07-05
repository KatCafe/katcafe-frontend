<template>
    <form action="/action_page.php" class="newPostContainer">

        Start a thread in <strong>{{channel}}</strong> <br/><br/>

        <div class="newPostContent">

            <div class="replyBox">

                <img class="profileAvatar" src="/public/assets/anonymus.png">
                <input type="text" placeholder="New post title" v-model="topicTitle" @change="titleChanged"/>

                <input type="file" style="display: none; " value="or Select File" v-on:change="fileChanged" accept="image/*" >

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

        Preview
        <topic :topic="previewTopic" :isSnippetForm="true" />

    </form>
</template>

<script>
import NetworkHelper from "modules/network/network-helper"
import LinkOrUpload from "client/components/UI/elements/link/link-or-upload"
import Captcha from "client/components/modules/captcha/captcha"
import Topic from "client/components/modules/topics/view/topic"
import StringHelper from "src/utils/string-helper"

export default {

    components: { LinkOrUpload, Captcha, Topic },

    props: {
        topicChannel: '',
    },

    data(){
        return {

            topicTitle: '',
            topicBody: '',

            link: '',
            prevLink: '',

            file: '',


            scraped: null,

            error : '',

            previewTopic:{
                title: '',
                body: '',
                slug: '',
                date: new Date().getTime(),

                link: '',
                preview: '',
            }

        }
    },

    computed:{

        channel(){
            return this.topicChannel ? this.topicChannel : this.$store.state.channels.channel.slug;
        },

        author(){
            return '';
        }

    },

    methods: {

        async extractLink(){

            let links = StringHelper.findLinks(this.topicTitle);
            let links2 = StringHelper.findLinks(this.topicBody);

            links = links.concat(links2);

            if (links.length ) {

                links = links.map( it => StringHelper.fixURL( it ) );

                this.link = links[0];
                this.linkChanged();
            }

        },

        async linkChanged(e){

            try{

                if (!this.link) return;
                if (this.link === this.prevLink) return;

                this.prevLink = this.link;

                const out = await NetworkHelper.post('/scraper/get',{
                    uri: this.link,
                });

                console.log(out);

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

        async createTopic(e){

            console.log('createTopic fired');

            const linkOrUpload = this.$refs['linkOrUpload'];
            const captcha = this.$refs['captcha'];

            try{

                this.error = '';

                const out = await NetworkHelper.post('/topics/create', {
                    channel: this.channel,
                    title: this.topicTitle || ( linkOrUpload.scraped ? linkOrUpload.scraped.title : ''  ),
                    body: this.topicBody   || ( linkOrUpload.scraped ? linkOrUpload.scraped.description : ''  ),
                    link: linkOrUpload.link,
                    file: linkOrUpload.file ? {
                        name: linkOrUpload.file.name,
                        base64: linkOrUpload.preview.img,
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

        },

        reset(){
            this.topicTitle = '';
            this.topicBody = '';
            this.file = '';
            this.link ='';
            this.prevLink = '';
        },

        openFileUpload(){
        },

        titleChanged(){
            this.previewTopic.title = this.topicTitle;
            this.extractLink();
        },

        bodyChanged(){
            this.previewTopic.body = this.topicBody;
            this.extractLink();
        }

    }

}
</script>

<style>

</style>