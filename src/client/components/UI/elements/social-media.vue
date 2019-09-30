/**
    https://nicolasbeauvais.github.io/vue-social-sharing/
**/

<template>

    <div class="social-media">

        <span>{{$t('socialMedia.text')}}</span>

        <no-ssr>
            <social-sharing :url="getURL()" :title="title" :description="description" inline-template>
                <div>
                    <network network="facebook">
                        <i class="fa fa-fw fa-facebook"></i>
                    </network>
                    <network network="linkedin">
                        <i class="fa fa-fw fa-linkedin"></i>
                    </network>
                    <network network="telegram">
                        <i class="fa fa-telegram"></i>
                    </network>
                    <network network="reddit">
                        <i class="fa fa-fw fa-reddit"></i>
                    </network>
                    <network network="twitter">
                        <i class="fa fa-fw fa-twitter"></i>
                    </network>
                    <network network="vk">
                        <i class="fa fa-vk"></i>
                    </network>
                    <network network="email">
                        <i class="fa fa-envelope"></i>
                    </network>
                    <network network="sms">
                        <i class="fa fa-phone"></i>
                    </network>
                    <network network="whatsapp">
                        <i class="fa fa-fw fa-whatsapp"></i>
                    </network>
                </div>
            </social-sharing>
        </no-ssr>

    </div>

</template>

<script>

import NoSsr from "vue-no-ssr";

export default {

    components: {NoSsr},

    props: {
        title: {default: ''},
        description: {default: ''}
    },

    methods:{

        getURL(){
            if (typeof window !== "undefined") return window.location.href;
            return '';
        }


    },

}

</script>

<style>

    .social-media{
        margin-bottom: 10px;
    }

    .social-media span,
    .social-media div{
        display: inline-block;
    }

    .social-media i{
        font-size: 18px;
        padding-right: 10px;
    }

</style>