<template>
    <div class="sideReplyBox">

        <!--<span class="commentSlug">Reply-->
            <!--<router-link :to="'/'+this.topic">{{title}}</router-link>-->
        <!--</span><br/><br/>-->

        <!--<link-or-upload ref="linkOrUpload" />-->

        <!--<label for="ltext">Text</label>-->

        <!--<textarea class="commentTextArea" type="text" id="ltext" name="text" cols="40" rows="5" placeholder="Text" v-model="commentBody" @scraped="scraped" > </textarea>-->

        <!--<captcha ref="captcha"/>-->

        <!--<input class="postButton" type="button" value="Submit reply" @click="createComment">-->

        <!--<div v-if="error" class="alert-box error"><span>error <br/><br/> </span> {{error}}</div>-->
        <!--<div v-if="success" class="alert-box success"><span>success <br/><br/> </span> {{success}}</div>-->


        <div class="replyBox">

            <img class="profileAvatar" src="/public/assets/anonymus.png">
            <textarea type="text" placeholder="Write a reply..."/>
            <img class="uploadPhoto" src="/public/assets/uploadPhoto.svg">

        </div>

    </div>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"
import LinkOrUpload from "client/components/UI/elements/link/link-or-upload"
import Captcha from "client/components/modules/captcha/captcha"
import BrowserHelper from "modules/helpers/browser.helpers"

export default {


    components: { LinkOrUpload, Captcha },

    props: {

        topic: null,
        channel: null,

    },

    data(){
        return {

            commentBody: '',
            commentTopic: '',

            error : '',
            success: '',

        }
    },

    computed:{

        author(){
            return '';
        },

        title(){
            return BrowserHelper.processLink(this.topic||this.channel, 30)
        }

    },

    methods: {

        async createComment(e){

            const linkOrUpload = this.$refs['linkOrUpload'];
            const captcha = this.$refs['captcha'];

            try{

                this.error = '';
                this.success = '';

                const out = await NetworkHelper.post('/comments/create', {
                    topic: this.topic,
                    link: linkOrUpload.link,
                    file: linkOrUpload.file ? {
                            name: linkOrUpload.file.name,
                            base64: linkOrUpload.preview.img,
                        } : undefined,
                    body: this.commentBody || ( linkOrUpload.scraped ? linkOrUpload.scraped.title || linkOrUpload.scraped.content : ''  ),
                    author: this.author,
                    captcha: {
                        solution: captcha.captchaInput,
                        encryption: captcha.captcha.encryption,
                    }
                });

                if (out && out.result) {
                    this.$store.commit('ADD_COMMENTS', [out.comment] );
                    this.success = 'Your comment was published!!';

                    this.$refs['linkOrUpload'].reset();

                    this.commentBody = '';

                }

                captcha.reset();

            }catch(err){

                this.error = err.message;
                if (this.error.indexOf("Captcha was already used") >= 0 || this.error.indexOf("Captcha is incorrect") >= 0 )
                    captcha.reset();

            }

            e.stopPropagation();

        },

        scraped(){
        }

    }

}
</script>

<style>

    .commentTextArea{

        resize: vertical;


    }

</style>