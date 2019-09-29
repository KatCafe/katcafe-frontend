<template>
    <div class="new-topic-content new-comment-content" >

        <span v-if="isPage">
            {{$t('comment.yourOpinionMatters')}}
        </span>

        <div :class="`new-topic-body new-comment-body${showPreview ? '' : '-empty'}`">

            <img class="profile-avatar" src="/public/assets/theme/anonymous.png">

            <div class="input-file-upload-group">
                <textarea type="text" :placeholder="$t('comment.writeReply')" v-model="commentBody" @change="bodyChanged"/>
                <input type="file" style="display: none; " value="or Select File" v-on:change="fileChanged" accept="image/*" ref="refFileInput" >
                <icon class="input-file-icon" icon="camera" @click="openFileUpload" />
            </div>

            <loading-button v-if="showPreview" @onClick="openCaptcha" text=""  style="margin: 0"/>

        </div>

        <span class="error-text">{{error}}</span>

        <div v-if="showPreview && isShowPreview">

            <icon icon="loading-spinner" v-if="loading" class="fa-3x" />

            <div v-if="!loading" >
                <span class='commentPreview hiddenMobile'>{{$t('comment.previewComment')}}</span>
                <comment :comment="previewComment" :isSnippetForm="true" />
            </div>

        </div>

    </div>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"
import StringHelper from "src/utils/string-helper"
import Icon from "client/components/UI/elements/icons/icon"
import Comment from "client/components/modules/content/comments/view/comment"
import LoadingButton from 'client/components/UI/elements/loading-button'

function initialState (){
    return {


        commentBody: '',
        link: '',
        _prevLink: '',

        file: null,

        scraped: null,

        error : '',
        loading: false,

        previewComment: {
            body: '',
            slug: '',
            date: new Date().getTime(),

            link: '',
            preview: null,
        },

    }
}

export default {

    name: 'add-comment-form',

    components: { Icon, Comment, LoadingButton },

    props: {
        topic: {default: null},
        isPage: {default: false},
        isShowPreview: {default: true},
    },

    data(){
        return initialState();
    },

    computed:{

        author(){
            return '';
        },

        body(){
            return this.commentBody || ( this.scraped ? this.scraped.title || this.scraped.description : ''  ) || '';
        },

        showPreview(){
            return this.body.length || this.previewComment.preview;
        }

    },

    methods: {

        async extractLink(){

            let links = StringHelper.findLinks(this.commentBody);

            if (!links.length ) return;

            links = links.map( it => StringHelper.fixURL( it ) );

            this.link = links[0];

            await this.linkChanged();

            this.commentBody = this.commentBody.replace(this.link, '');

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

                if (out  && (out.scrape.image || out.scrape.title || out.scrape.description ) ) {

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
            captchaModal.showModal( async (resolve2, captchaData)=>{

                try{

                    this.error = '';

                    const out = await NetworkHelper.post('/comments/create', {
                        topic: typeof this.topic === "string" ? this.topic : this.topic.slug,
                        link: this.link,
                        file: this.file ? {
                            name: this.file.file.name,
                            base64: this.file.preview.img,
                        } : undefined,
                        body: this.body,
                        author: this.author,
                        captcha: captchaData,
                    });

                    captchaModal.reset();
                    captchaModal.closeModal();

                    if (out) {
                        this.$store.commit('ADD_COMMENTS', [out.comment]);
                        this.reset();
                    }

                    this.$emit('onSuccess', out.comment);

                }catch(err){

                    this.error = captchaModal.processError(err.message);
                    if (this.error) captchaModal.closeModal();

                    this.error = this.error.replace('You need to provide either a link/file or write 5 characters', this.$i18n.t('comment.errorNoFileOrText'));

                    setTimeout( () => this.error = '', 8000 );

                }

                resolve2(true);

            });

            resolve();

        },

        bodyChanged(){
            this.extractLink();
        },

        openFileUpload(){
            this.$refs['refFileInput'].click();
        },

        reset(){
            Object.assign(this.$data, initialState());
        },

        updatePreviewComment(){

            this.previewComment.body = this.body;
            this.previewComment.link = this.link;
            this.previewComment.topic = this.topic;

            this.previewComment.preview = undefined;

            if (this.scraped && this.scraped.image)
                this.previewComment.preview = Object.assign( {
                    link: this.link
                }, this.scraped.image);

            if (this.file)
                this.previewComment.preview = {
                    base64: this.file.preview,
                    link: this.file.file.name,
                };

            this.previewComment.author = this.author;

        }

    },

    watch:{
        commentBody: function (newValue, oldValue) {
            this.updatePreviewComment();
        },
        scraped: function (newValue, oldValue) {
            this.updatePreviewComment();
        },
        file: function (newValue, oldValue) {
            this.updatePreviewComment();
        },
    }

}
</script>


