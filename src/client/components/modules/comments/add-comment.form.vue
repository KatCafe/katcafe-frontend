<template>
    <form action="/action_page.php" >

        Reply in <strong>{{topic.slug}}</strong> <br/><br/>

        <label for="flink">Link</label>
        <input type="text" id="flink" name="link" placeholder="Link" v-model="commentLink">

        <label for="ltext">Text</label>

        <textarea class="commentTextArea" type="text" id="ltext" name="text" cols="40" rows="5" placeholder="Text" v-model="commentBody" > </textarea>

        <label for="ltext">Captcha</label>

        <input type="button" value="Create" @click="createComment">

        {{error}}

    </form>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"

export default {

    components: {  },

    props: {

        topic: null,
        channel: null,

    },

    data(){
        return {
            commentLink: '',
            commentBody: '',
            commentTopic: '',

            error : '',
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

                const out = await NetworkHelper.post('/comments/create', {
                    topic: this.topic.slug,
                    link: this.topicLink,
                    body: this.commentBody,
                    author: this.author,
                });

                if (out && out.result){

                    alert('success');

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