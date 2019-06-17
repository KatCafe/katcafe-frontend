<template>
    <div>

        <comment v-for="(comment, index) in comments"
                 :key="index"
                 :comment="comment"
        >

        </comment>

    </div>
</template>

<script>
import Comment from "./comment"
export default {

    components: {Comment },

    props: {
        comments:{
            default(){
                return [];
            }
        }
    }
}
</script>