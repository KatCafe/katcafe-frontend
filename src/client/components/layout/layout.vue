<template>

    <div>

        <header-layout />

        <div class="layoutContent" :style="{minHeight: minHeight+'px'}">

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
            default(){ return [] },
        },
    },

    computed:{

    },

    data(){
        return {
            minHeight: 0,
        }
    },

    mounted(){

        if (typeof window === "undefined") return;

        this.minHeight =  screen.height;

        this.$store.dispatch('LOCALIZATION_FETCH',);


    },

    methods:{

        showAddTopicModal(){
            this.$refs['addTopicModal'].showModal();
        },

    }

}


</script>