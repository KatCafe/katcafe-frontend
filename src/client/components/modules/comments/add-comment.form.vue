<template>
    <form action="/action_page.php" >

        Reply in <strong>{{topic.slug}}</strong> <br/><br/>

        <link-or-upload ref="linkOrUpload" />

        <label for="ltext">Text</label>

        <textarea class="commentTextArea" type="text" id="ltext" name="text" cols="40" rows="5" placeholder="Text" v-model="commentBody" > </textarea>

        <label for="ltext">Captcha</label>

        <input type="button" value="Create" @click="createComment">

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

                console.log({
                    name: this.$refs['linkOrUpload'].file.name,
                    base64: this.$refs['linkOrUpload'].preview.img,
                });

                const out = await NetworkHelper.post('/comments/create', {
                    topic: this.topic.slug,
                    link: this.$refs['linkOrUpload'].link,
                    file: this.$refs['linkOrUpload'].file ? {
                            name: this.$refs['linkOrUpload'].file.name,
                            base64: this.$refs['linkOrUpload'].preview.img,
                        } : undefined,
                    body: this.commentBody,
                    author: this.author,
                });

                if (out && out.result) {
                    this.$store.commit('ADD_COMMENT', out.comment);
                    this.success = 'Success!';

                    this.$refs['linkOrUpload'].reset();

                    this.commentBody = '';

                }


            }catch(err){

                this.error = err.message;

            }

            e.stopPropagation();

        }

    }

}
</script>

<style>

    .commentTextArea{

        resize: vertical;


    }

</style>