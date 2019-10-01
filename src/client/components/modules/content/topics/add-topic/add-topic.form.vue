<template>
    <form action="#" class="new-topic-form">

        <div class="topic-title">
            {{ $t('topic.startThread' ) }} <strong>{{channel}}</strong>
        </div>

        <div class="new-topic-content">

            <div class="new-topic-title">

                <img class="profile-avatar" src="/public/assets/theme/anonymous.png">

                <div class="input-file-upload-group">
                    <input type="text" :placeholder="$t('topic.threadTitle')" v-model="topicTitle" @change="titleChanged"/>
                    <input type="file" style="display: none; " value="or Select File" v-on:change="fileChanged" accept="image/*" ref="refFileInput" >
                    <icon class="input-file-icon" icon="camera" @click="openFileUpload" />
                </div>

            </div>

            <div class="new-topic-body">

                <textarea type="text" :placeholder="$t('topic.threadComment')" v-model="topicBody" @change="bodyChanged"/>

                <loading-button @onClick="openCaptcha" :text="$t('topic.submitTopic')" />

            </div>

        </div>

        <div v-if="error" class="alert-box error"><span>error <br/><br/> </span> {{error}}</div>
        <icon icon="loading-spinner" v-if="loading" />

        <div v-if="showPreview && !loading" >

            <span>{{$t('topic.previewThread')}}</span>
            <topic :topic="previewTopic" :isSnippetForm="true" />
        </div>

    </form>
</template>

<script>
import NetworkHelper from "modules/network/network-helper"
import Topic from "client/components/modules/content/topics/view/topic"
import StringHelper from "utils/string-helper"
import Icon from "client/components/UI/elements/icons/icon"
import LoadingButton from 'client/components/UI/elements/loading-button'
import AddTopicParams from "./add-topic-params"

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

    components: { Topic, Icon, LoadingButton, AddTopicParams },

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
            return this.$store.state.auth.user ? this.$store.state.auth.user.username : '';
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

                if (out && (out.scrape.image || out.scrape.title || out.scrape.description ) ) {

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

        async openCaptcha(e, resolve){

            resolve(true);

            const captchaModal = document.getElementById('captchaModal').__vue__;
            captchaModal.showModal( async (resolve2, captchaData, refAdditionalParams)=>{

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
                        captcha: captchaData,
                        isAnonymous: refAdditionalParams ? refAdditionalParams.isAnonymous : false,
                    });

                    captchaModal.reset();
                    captchaModal.closeModal();

                    this.reset();

                    this.$emit('onSuccess', out.comment);

                    this.$router.push({path: '/'+out.topic.slug });


                }catch(err){

                    this.error = captchaModal.processError(err.message);
                    if (this.error) captchaModal.closeModal();

                    this.error = this.error.replace('Too few letters. Minimum 4 letters', this.$i18n.t('topic.errorTooFewLetters'));
                    setTimeout( () => this.error = '', 8000 );

                }

                resolve2(true);

            }, this.$store.state.auth.user ? AddTopicParams : undefined);

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