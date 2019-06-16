<template>
    <form action="/action_page.php" >

        <strong>Reply</strong><br/><br/>

        <link-or-upload ref="linkOrUpload" />

        <label for="ltext">Text</label>

        <textarea class="commentTextArea" type="text" id="ltext" name="text" cols="40" rows="5" placeholder="Text" v-model="commentBody" @scraped="scraped" > </textarea>

        <label for="ltext">Captcha</label>

        <input type="button" value="Submit reply" @click="createComment">

        <div v-if="error" class="alert-box error"><span>error <br/><br/> </span> {{error}}</div>
        <div v-if="success" class="alert-box success"><span>success <br/><br/> </span> {{success}}</div>

    </form>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"
import LinkOrUpload from "client/components/UI/elements/link/link-or-upload"

export default {

    components: { LinkOrUpload },

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
        }

    },


    methods: {


        async createComment(e){

            try{

                this.error = '';
                this.success = '';

                const linkOrUpload = this.$refs['linkOrUpload'];

                const out = await NetworkHelper.post('/comments/create', {
                    topic: this.topic.slug,
                    link: linkOrUpload.link,
                    file: linkOrUpload.file ? {
                            name: linkOrUpload.file.name,
                            base64: linkOrUpload.preview.img,
                        } : undefined,
                    body: this.commentBody || ( linkOrUpload.scraped ? linkOrUpload.scraped.title || linkOrUpload.scraped.content : ''  ),
                    author: this.author,
                });

                if (out && out.result) {
                    this.$store.commit('ADD_COMMENT', out.comment);
                    this.success = 'Your comment was published!!';

                    this.$refs['linkOrUpload'].reset();

                    this.commentBody = '';

                }


            }catch(err){

                this.error = err.message;

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