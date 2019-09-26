<template>

    <div v-if="modalOpened">

        <div class="modalBackground" @click="this.closeModal"> </div>

        <div class="modal show-modal" ref="refModal">
            <div class="modal-content">
                <icon icon="times-circle" class="close-button " @click="this.closeModal" />

                <slot class="noOverflow" name="content"/>
            </div>
        </div>

    </div>

</template>


<script>
import Icon from "client/components/UI/elements/icons/icon"

export default{

    components: {Icon},

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

            if( e) e.stopPropagation();

            this.modalOpened = false;

        },

        showModal(e){

            if (e) e.stopPropagation();

            this.modalOpened = true;
        },

    }

}

</script>


