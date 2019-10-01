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
        }

    }
</script>