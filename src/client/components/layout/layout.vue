<template>

    <div>

        <header-layout />

        <div class="layout-content" :style="{minHeight: minHeight+'px'}">

            <slot name="content"/>

        </div>

        <captcha-modal id="captchaModal" />

        <sticky-buttons :stickyButtons="stickyButtons" />

        <footer-layout/>

    </div>

</template>

<script>


import HeaderLayout from "./header/header-layout"
import FooterLayout from "./footer/footer-layout"
import StickyButtons from "./footer/sticky/sticky-buttons"
import AddTopicModal from "client/components/modules/topics/add-topic.modal"
import CaptchaModal from "client/components/modules/captcha/captcha.modal"

import Icon from "client/components/UI/elements/icons/icon"

export default{

    components:{ HeaderLayout, FooterLayout,  StickyButtons, AddTopicModal, Icon, CaptchaModal },

    props: {
        stickyButtons: { default(){ return [] },},
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

        this.minHeight =  window.innerHeight;

        this.$store.dispatch('LOCALIZATION_FETCH',);

    },

    methods:{


    }

}


</script>