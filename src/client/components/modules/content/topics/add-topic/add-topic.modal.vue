<template>

    <modal ref="modal">
        <div slot="content"  >
            <add-topic-form ref="addTopicForm"  :topicChannel="topicChannel" />
        </div>
    </modal>

</template>

<script>

import AddTopicForm from "client/components/modules/content/topics/add-topic/add-topic.form"
import Modal from "client/components/UI/modal/modal"

export default {

    components: {AddTopicForm, Modal},

    data(){
        return {
            topicChannel: '',
        }
    },

    methods: {

        showModal(channel){

            this.topicChannel = channel;

            this.$refs['modal'].showModal();

        },

        closeModal(){
            this.$refs['modal'].closeModal();
        },
    },


}
</script>