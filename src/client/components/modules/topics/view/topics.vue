<template>

    <div>

        <topic v-for="(topic, index) in topics"
               :key="index"
               :topic="topic"
        >

        </topic>

    </div>

</template>

<script>
import Topic from "./topic"
export default {

    components: { Topic },

    props: {
        topics: {
            default(){
                return [];
            }
        },
    }

}
</script>