<template>

    <div>

        <content-options-bar/>

        <div class="row">

            <div class="column left">

                <template v-if=" contentDisplay === 'topics' " >

                    <add-topic-form :topicChannel="channelToWrite" />

                    <topics v-if="topics.length" :topics="topics" :channel="slug" />

                    <template v-if="!topics.length && !layoutLoading ">
                        <span>Channel <strong>{{ this.slug }}</strong> was not found</span>
                    </template>

                </template>

            </div>

        </div>

    </div>

</template>

<script>

import ContentOptionsBar from "./content-options/content-options-bar"
import Topics from "client/components/modules/content/topics/view/topics"
import AddTopicForm from "client/components/modules/content/topics/add-topic.form"

export default {

    components: {AddTopicForm, ContentOptionsBar, Topics},

    props:{
        slug: {default: ''},
        channelToWrite: {default: ''},
    },

    data(){
        return {
        }
    },

    computed:{

        contentDisplay(){
            return this.$store.state.global.contentDisplay;
        },

        topics(){
            return this.$store.getters.getTopics();
        },
    }

}
</script>

<style>

</style>