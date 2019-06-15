<template>

    <layout >

        <div slot="content"  >

            <div class="content">
                <div class="container">

                    <h1>Create a Channel</h1>
                    <add-channel-form/>

                </div>
            </div>

        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import AddChannelForm from "client/components/modules/channel/add-channel.form"

export default {

    components: {
        Layout,
        AddChannelForm,
    },

    data(){
        return {
            result: null,
        }
    }

}
</script>

<style>

</style>