<template>
    <form action="#" class="new-topic-form">

        <div class="topic-title">
            {{ $t('topic.startThread' ) }} <strong>{{channel}}</strong>
        </div>

        <div class="new-topic-content">

            <div class="new-topic-title">

                <img class="profile-avatar" src="/public/assets/theme/anonymous.png">

                <div class="input-file-upload-group">
                    <input type="text" :placeholder="$t('topic.threadTitle')" v-model="titleEdit" @change="titleChanged"/>
                    <input type="file" style="display: none; " value="or Select File" v-on:change="fileChanged" accept="image/*" ref="refFileInput" >
                    <icon class="input-file-icon" icon="camera" @click="openFileUpload" />
                </div>

            </div>

            <div class="new-topic-body">

                <textarea type="text" :placeholder="$t('topic.threadComment')" v-model="bodyEdit" @change="bodyChanged"/>

                <loading-button @submit="openCaptcha" :text="$t('topic.submitTopic')" />

            </div>

        </div>

        <div v-if="error" class="alert-box error"><span>error <br/><br/> </span> {{error}}</div>
        <icon icon="loading-spinner" v-if="loading" class="fa-3x" />

        <div v-if="showPreview && !loading" >

            <span>{{$t('topic.previewThread')}}</span>
            <topic :topic="previewContent" :isSnippetForm="true" />
        </div>

    </form>
</template>

<script>

import AddTopicBase from "./add-topic-base.form"
import Topic from "client/components/modules/content/topics/view/topic"
import Icon from "client/components/UI/elements/icons/icon"
import LoadingButton from 'client/components/UI/elements/loading-button'
import AddTopicParams from "./add-topic-params"


export default {

    extends: AddTopicBase,

    components: { Topic, Icon, LoadingButton, AddTopicParams, AddTopicBase },

    computed:{

        additionalParamsForm(){
            return AddTopicParams;
        },


        channel(){
            if (this.parentSlug ) return this.parentSlug;
            if (this.$store.state.channels.channel) return this.$store.state.channels.channel.slug;
            return '';
        },

    },

    methods: {

        postSubmit(captchaData, refAdditionalParams){

            return this.$root.networkHelper.post( '/topics/create', {
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

        },

        postSubmitSuccessful(out){

            this.$emit('onSuccess', out.topic);

            this.$router.push({path: '/'+out.topic.slug });

        },

        updatePreviewAdditional(){
            this.previewContent.channel = this.channel;
        }

    },


}
</script>

<style>



</style>