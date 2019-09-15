<template>

    <div class="btn-floating-container">
        <button class="btn-floating btn btn-primary btn-medium"
                v-for=" (btn, index) in stickyButtonsFiltered"
                :key="index"
                @click="() => btn.click($parent.$parent) "
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
            default(){ return []},
        },
    },

    computed:{

        stickyButtonsFiltered(){
            return this.stickyButtons.filter ( it => it );
        }

    }

}
</script>