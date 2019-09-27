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

<style>

    .btn-floating-container {
        right: 50px;
        bottom: 50px;
        position: fixed;
    }

    .btn-floating {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(245, 245, 245, 0.075);
        text-align: center;
        padding: 0px;
        font-size: 24px;
        margin-left: 10px;
    }

</style>