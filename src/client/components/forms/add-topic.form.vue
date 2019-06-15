<template>
    <form action="/action_page.php" >

        Start a thread in <strong>{{channel}}</strong> <br/><br/>

        <label for="flink">Link</label>
        <input type="text" id="flink" name="link" placeholder="Link" v-model="topicLink">

        <label for="ftitle">Title</label>
        <input type="text" id="ftitle" name="title" placeholder="Title" v-model="topicTitle">

        <label for="ltext">Text</label>
        <textarea type="text" id="ltext" name="text" cols="40" rows="5" placeholder="Text" v-model="topicBody"> </textarea>

        <label for="ltext">Captcha</label>

        <input type="button" value="Create" @click="createTopic">

        {{error}}

    </form>
</template>

<script>
import NetworkHelper from "modules/network/network-helper"

export default {

    components: {  },

    data(){
        return {
            topicTitle: '',
            topicLink: '',
            topicBody: '',
            topicChannel: '',

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

        async createTopic(e){

            try{

                this.error = '';

                const out = await NetworkHelper.post('/topics/create', {
                    channel: this.channel,
                    title: this.topicTitle,
                    link: this.topicLink,
                    body: this.topicBody,
                    author: this.author,
                });

                console.log(out);

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

</style>