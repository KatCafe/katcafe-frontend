<template>

    <layout  >

        <div slot="content"  >

            <div class="popup">

                <h1>Sign up</h1>

                <signup-form />

            </div>

        </div>

    </layout>

</template>

<script>
import Layout from "client/components/layout/layout"
import SignupForm from "client/components/modules/auth/signup.form"

export default {

    components: { Layout, SignupForm },

}

</script>

<style>

</style>