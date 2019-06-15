<template>

    <div class="btn-floating-container">
        <button class="btn-floating btn btn-primary btn-medium"
                v-for=" (btn, index) in stickyButtons"
                :key="index"
                @click="btn.click"
        >
            <img :src="btn.img">
        </button>
    </div>

</template>

<script>
export default {
    props: {
        stickyButtons: {
            type: Array,
            default(){
                return []
            },
        },
    }
}
</script>