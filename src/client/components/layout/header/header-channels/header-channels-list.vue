<template>
    <ul class="nav">
        <li v-for=" (it, index) in channels "
            :key="index">

            <router-link :to="`/${it}`" >
                {{it}}
            </router-link>

        </li>
    </ul>
</template>

<script>
export default {

    props: {
        channels: undefined,
    }

}
</script>