<template>

    <div>

        das

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

export default {

    components: { Topic, Comments },

    props: {

        topics: {default(){return [];}},
        comments: {default(){return [];} },
    }

}
</script>