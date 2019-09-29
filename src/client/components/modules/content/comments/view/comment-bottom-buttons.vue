<template>
    <div>
        <div class="topic-bottom-buttons comment-bottom-buttons">

            <div @click="showAddReply">
                <icon icon="comment" />
                <span>Reply</span>
            </div>

        </div>

        <template v-if="addReply">
            <add-comment-form :topic="comment.topic" @onSuccess="showAddReply(false)"/>
        </template>
    </div>
</template>

<script>

import AddCommentForm from "client/components/modules/content/comments/add-comment.form"
import Icon from "client/components/UI/elements/icons/icon"

export default {

    components: {AddCommentForm, Icon },

    data(){
        return {
            addReply: false,
        }
    },

    props: {
        comment: null,
    },

    methods: {

        showAddReply(value = true){
            this.addReply = value;
        }

    }

}
</script>

<style>

</style>