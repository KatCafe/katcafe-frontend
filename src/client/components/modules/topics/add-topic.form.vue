<template>
    <form action="/action_page.php" >

        Start a thread in <strong>{{channel}}</strong> <br/><br/>

        <link-or-upload ref="linkOrUpload" />

        <label for="ftitle">Title</label>
        <input type="text" id="ftitle" name="title" placeholder="Title" v-model="topicTitle">

        <label for="ltext">Text</label>
        <textarea type="text" id="ltext" name="text" cols="40" rows="5" placeholder="Text" v-model="topicBody"> </textarea>

        <label for="ltext">Captcha</label>

        <input type="button" value="Create" @click="createTopic">

        <div v-if="error" class="alert-box error"><span>error <br/><br/> </span> {{error}}</div>

    </form>
</template>

<script>
import NetworkHelper from "modules/network/network-helper"
import LinkOrUpload from "client/components/UI/elements/link/link-or-upload"

export default {

    components: { LinkOrUpload },

    data(){
        return {

            topicTitle: '',
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

                const linkOrUpload = this.$refs['linkOrUpload'];

                const out = await NetworkHelper.post('/topics/create', {
                    channel: this.channel,
                    title: this.topicTitle || ( linkOrUpload.scraped ? linkOrUpload.scraped.title : ''  ),
                    body: this.topicBody   || ( linkOrUpload.scraped ? linkOrUpload.scraped.description : ''  ),
                    link: linkOrUpload.link,
                    file: linkOrUpload.file ? {
                        name: linkOrUpload.file.name,
                        base64: linkOrUpload.preview.img,
                    } : undefined,
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

</style>