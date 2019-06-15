<template>

    <div>

        <header-layout />

        <div class="layoutContent">

            <slot  name="content">
            </slot>

        </div>


        <sticky-buttons :stickyButtons="stickyButtons" />

        <footer-layout/>

        <add-topic-modal ref="addTopicModal" />

    </div>

</template>

<script>


import HeaderLayout from "./header/header-layout"
import FooterLayout from "./footer/footer-layout"
import StickyButtons from "./footer/sticky/sticky-buttons"
import AddTopicModal from "client/components/modules/topics/add-topic.modal"

export default{

    components:{ HeaderLayout, FooterLayout,  StickyButtons, AddTopicModal },

    props: {
        stickyButtons: {
            type: Array,
            default(){
                return []
            },
        },
    },

    computed:{


    },

    mounted(){

        if (typeof window === "undefined") return;

        document.body.className = "nav-md";


    },

    methods:{

        showAddTopicModal(){
            this.$refs['addTopicModal'].showModal();
        },

    }

}


</script>