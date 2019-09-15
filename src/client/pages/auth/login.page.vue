<template>

    <layout >

        <div slot="content"  >

            <div class="popup">

                <h1>Login</h1>

                <login-form />

            </div>

        </div>

    </layout>

</template>

<script>
import Layout from "client/components/layout/layout"
import LoginForm from "client/components/modules/auth/login.form"

export default {

    components: { Layout, LoginForm },

}

</script>

<style>

</style>