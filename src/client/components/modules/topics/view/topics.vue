<template>

    <div>

        <add-topic-form />

        <topic v-for="(topic, index) in topics"
               :key="index"
               :topic="topic"
               :comments="comments.filter( it => it.topic === topic.slug )"
               :isPreview = "true"
               class="topicSeparator"
        />

    </div>

</template>

<script>

import Topic from "./topic"
import Comments from "client/components/modules/comments/view/comments"
import AddTopicForm from "client/components/modules/topics/add-topic.form"

export default {

    components: {AddTopicForm, Topic, Comments },

    props: {

        topics: {default(){return [];}},
        comments: {default(){return [];} },
    }

}
</script>