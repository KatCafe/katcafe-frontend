<template>

    <div>

        <topic v-for="(topic, index) in topics"
               :key="index"
               :topic="topic"
               :isPreview = "true"
               class="topic-separator"
        />

    </div>

</template>

<script>

import Topic from "./topic"
import Comments from "client/components/modules/content/comments/view/comments"

export default {

    components: { Topic, Comments },

    props: {
        channel: {default: ''},
        topics: {default(){return [];}},
        comments: {default(){return [];} },
    }

}
</script>

<style>

    .topic-separator{

    }

</style>