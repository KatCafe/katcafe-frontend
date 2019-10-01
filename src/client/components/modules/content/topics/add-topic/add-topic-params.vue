<template>

    <div>
        <label>
            <input type="checkbox" v-model="isAnonymous"> {{$t('topic.postAnonymously')}}
        </label>

        <slot/>

    </div>

</template>

<script>
export default {

    data(){
        return {
            isAnonymous: false,
        }
    },

    mounted(){

        if (typeof window === "undefined") return;

        this.isAnonymous = localStorage.getItem('optionIsAnonymous') === "true";

    },

    watch: {
        isAnonymous: function (newValue, oldValue) {
            localStorage.setItem('optionIsAnonymous', newValue);
        },
    }

}
</script>