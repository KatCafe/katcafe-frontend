<template>
    <form action="/action_page.php" >

        <div>
            Reply in <strong>{{channel}}</strong> <br/><br/>

            <label for="flink">Link</label>
            <input type="text" id="flink" name="link" placeholder="Link" v-model="commentLink">

            <label for="ftitle">Title</label>
            <input type="text" id="ftitle" name="title" placeholder="Title" v-model="commentTitle">

            <label for="ltext">Text</label>
        </div>

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

    data(){
        return {
            commentTitle: '',
            commentLink: '',
            commentBody: '',
            commentTopic: '',

            error : '',
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

        async createComment(e){

            try{

                this.error = '';

                const out = await NetworkHelper.post('/topics/create', {
                    channel: this.channel,
                    title: this.topicTitle,
                    link: this.topicLink,
                    body: this.topicBody,
                    author: this.author,
                });

                this.$router.push({path: '/'+out.topic.slug });

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