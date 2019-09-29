<template>

    <div>

        <topic v-for="(topic, index) in topics"
               :key="topic.slug"
               :name="topic.slug"
               :topic="topic"
               :isPreview = "true"
               class="topic-separator"
        />

    </div>

</template>

<script>

import Topic from "./topic"

export default {

    components: { Topic },

    props: {
        topics: {default(){return [];}},
    }

}
</script>

<style>

    .topic-separator{

    }

</style>