<template>

    <layout  >

        <div slot="content"  >

            <div class="popup">

                <h1>Logout</h1>

            </div>

        </div>

    </layout>

</template>

<script>
export default {

    components: { },

    async mounted(){

        await this.$store.dispatch('AUTH_LOGOUT');

        this.$router.push({path: '/'});

    }

}
</script>
