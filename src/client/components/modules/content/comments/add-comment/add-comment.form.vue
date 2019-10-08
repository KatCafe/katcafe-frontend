<template>
    <div class="new-topic-content new-comment-content" >

        <span v-if="isPage">
            {{$t('comment.yourOpinionMatters')}}
        </span>

        <div :class="`new-topic-body new-comment-body${showPreview ? '' : '-empty'}`">

            <img class="profile-avatar" src="/public/assets/theme/anonymous.png">

            <div class="input-file-upload-group">
                <textarea type="text" :placeholder="$t('comment.writeReply')" v-model="bodyEdit" @change="bodyChanged" ref="ref-text-area" :style="{maxHeight: textAreaMaxHeight+'px'}" />
                <input type="file" style="display: none; " value="or Select File" v-on:change="fileChanged" accept="image/*" ref="refFileInput" >
                <icon class="input-file-icon" icon="camera" @click="openFileUpload" />
            </div>

            <loading-button v-if="showPreview" @submit="openCaptcha" :text="$t('comment.submitComment')"  />

        </div>



        <span class="error-text">{{error}}</span>

        <div v-if="showPreview && isShowPreview">

            <icon icon="loading-spinner" v-if="loading" class="fa-3x" />

            <div v-if="!loading" >
                <span class='commentPreview hiddenMobile'>{{$t('comment.previewComment')}}</span>
                <comment :comment="previewContent" :isSnippetForm="true" />
            </div>

        </div>

    </div>
</template>

<script>

import Icon from "client/components/UI/elements/icons/icon"
import Comment from "client/components/modules/content/comments/view/comment"
import LoadingButton from 'client/components/UI/elements/loading-button'
import AddCommentParams from "./add-comment-params"
import AddTopicBase from "./../../topics/add-topic/add-topic-base.form"
import Autosize from "autosize"

export default {

    extends: AddTopicBase,

    name: 'add-comment-form',

    props:{
        topic: {default: null},
        isPage: {default: false},
        isShowPreview: {default: true},
        useTitle: {default: false},
        textAreaMaxHeight: {default: 150},
    },

    components: { Icon, Comment, LoadingButton, AddTopicBase },

    computed:{

        additionalParamsForm(){
            return AddCommentParams;
        },

        slug(){
            if (this.parentSlug ) return this.parentSlug;

            if (this.topic){
                if (typeof this.topic === 'string') return this.topic;
                return this.topic.slug;
            }

            return '';
        },

    },

    methods: {

        postSubmit(captchaData, refAdditionalParams){

            return this.$root.networkHelper.post('/comments/create', {
                topic: this.slug,
                link: this.link,
                file: this.file ? {
                    name: this.file.file.name,
                    base64: this.file.preview.img,
                } : undefined,
                body: this.body,
                isAnonymous: refAdditionalParams ? refAdditionalParams.isAnonymous : false,
                captcha: captchaData,
            });

        },

        postSubmitSuccessful(out){
            if (out) {
                this.$store.commit('ADD_COMMENTS', [out.comment]);
                this.reset();
            }

            this.$emit('onSuccess', out.comment);
        },

        updatePreviewAdditional(){
            this.previewContent.topic = this.topic;
        },


    },

    mounted(){

        if (typeof window === "undefined") return;
        Autosize(this.$refs['ref-text-area']);

    }

}
</script>


