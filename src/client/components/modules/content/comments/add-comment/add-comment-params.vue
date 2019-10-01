<template>

    <add-topic-params ref="refAddTopicParams">

    </add-topic-params>

</template>

<script>

import AddTopicParams from "./../../topics/add-topic/add-topic-params"

export default {

    components: {AddTopicParams},

    computed:{
        isAnonymous(){
            return this.$refs['refAddTopicParams'].isAnonymous;
        }
    },

}
</script>