<template>

    <modal ref="modal">
        <div slot="content"  >
            <add-topic-form  />
        </div>
    </modal>

</template>

<script>

import AddTopicForm from "client/components/forms/add-topic.form"
import Modal from "client/components/UI/modal/modal"

export default {
    components: {AddTopicForm, Modal},

    methods: {

        showModal(){
            this.$refs['modal'].showModal();
        },

        closeModal(){
            this.$refs['modal'].closeModal();
        },
    },


}
</script>