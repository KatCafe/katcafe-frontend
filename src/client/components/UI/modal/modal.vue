<template>

    <div v-if="modalOpened">

        <div v-if="showBackground" class="modal-background" @click="this.closeModal" />

        <div v-if="showContent" :class="` ${modalClass} modal show-modal`" ref="refModal">
            <div :class="` ${modalContentClass} modal-content`">
                <icon v-if="showCloseButton" icon="times-circle" class="close-button " @click="closeModal" />

                <template v-if="form" >
                    <component  :is="form" ref="refForm" />
                    <hr />
                </template>

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
            form: null,
        }
    },

    props:{
        title: {default: 'Modal Title'},
        showBackground: {default: true},
        showCloseButton: {default: true},
        showContent: {default: true},
        modalClass: {default: ''},
        modalContentClass: {default: ''},
    },

    methods:{

        closeModal(e){

            if( e) e.stopPropagation();
            this.form = null;

            this.modalOpened = false;

        },

        showModal(e, form){

            if (e) e.stopPropagation();

            this.form = form;
            this.modalOpened = true;
        },

    }

}

</script>


<style>
    .modal-background{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(26, 26, 26, 0.8);
        z-index: 10;
    }

    .modal {
        position:fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        visibility: hidden;
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
        z-index: 11;
    }

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        background-color: var(--form-bg-color);
        border: solid 1px var(--form-border-color);
        width: 95%;
        -webkit-box-shadow: 0px 0px 19px 5px rgba(0,0,0,0.25);
        box-shadow: 0px 0px 19px 5px rgba(0,0,0,0.25);
        padding: 9px;
    }

    .close-button {
        position: absolute;
        top: -20px;
        right: 0;
        text-align: center;
        cursor: pointer;
        color: white;
    }


    .close-button:hover {
        background-color: #4c4c4c;
    }

    .show-modal {
        opacity: 1;
        visibility: visible;
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
        width: 100%;
        max-width: 600px;
    }

    .modal hr{
        border-top-color: #4b3f3f;
    }


    @media only screen and (max-width: 600px) {

        .modal-content {
        }

    }

</style>