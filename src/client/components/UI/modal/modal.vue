<template>

    <div v-if="this.modalOpened">
        <div class="modalBackground" @click="this.closeModal"> </div>
        <div class="modal show-modal" ref="refModal">
            <div class="modal-content">
                <span class="close-button" @click="this.closeModal">&times;</span>
                <slot class="noOverflow" name="content">
                </slot>

            </div>
        </div>

    </div>

</template>


<script>

export default{

    name: "Modal",

    data: () => {
        return {
            modalOpened: false,
        }
    },

    props:{

        title: {default: 'Modal Title'},

    },

    methods:{

        closeModal(e){

            if( e !== undefined) e.stopPropagation();

            this.modalOpened = false;

        },

        showModal(e){

            if (e !== undefined) e.stopPropagation();

            this.modalOpened = true;
        },

    }

}

</script>



<style>




</style>