<template>

    <layout :stickyButtons="stickyButtons" ref="layout">

        <div slot="content"  >

            <div v-if="channel">

                <hero :title="channel.slug" :icon="channel.icon" :cover="channel.cover" />

                <div class="content">
                    <div class="container">


                    </div>
                </div>

            </div>

            <div v-if="!channel">

                <div class="content">
                    <div class="container">

                        <span>Channel {{ this.slug }} was not found</span>

                    </div>
                </div>


            </div>

        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Hero from "client/components/heros/hero"

export default {

    components: { Layout,  Hero },

    async asyncData ({ store,  route }){

        if (route.params.slug)
            await store.dispatch('CHANNEL_GET', { slug: route.path, });

    },

    computed: {

        channel(){
            return this.$store.state.channels.channel;
        },

        stickyButtons(){
            return [
                {
                    title: "Write topic",
                    img: 'https://cdn4.iconfinder.com/data/icons/momenticons-basic/32x32/edit2.png',
                    click: () => this.$refs['layout'].showAddTopicModal( )
                }
            ]
        },

    },

    created() {
        this.slug = this.$route.params.slug;
    },

}
</script>

<style>

</style>