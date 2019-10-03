<template>

    <modal ref="modal">
        <div slot="content"  >
            <add-topic-form ref="addTopicForm"  :parentSlug="parentSlug" />
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
            parentSlug: '',
        }
    },

    methods: {

        showModal(parentSlug){

            this.parentSlug = parentSlug;

            this.$refs['modal'].showModal();

        },

        closeModal(){
            this.$refs['modal'].closeModal();
        },
    },


}
</script>