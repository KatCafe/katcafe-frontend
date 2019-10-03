<template>

    <div>
        <label>
            <input type="checkbox" v-model="isAnonymous"> {{$t('topic.postAnonymously')}}
        </label>

        <slot/>
    </div>


</template>

<script>

import AddTopicParams from "./../../topics/add-topic/add-topic-params"

export default {

    extends: AddTopicParams,

    components: {AddTopicParams},


}
</script>