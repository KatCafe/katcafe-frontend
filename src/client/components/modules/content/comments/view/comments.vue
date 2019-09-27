<template>
    <div>

        <comment v-for="(comment, index) in comments"
                 :key="index"
                 :comment="comment"
                 :isPreview="isPreview"
        >

        </comment>

    </div>
</template>

<script>
import Comment from "./comment"


export default {

    components: { Comment, },

    props: {

        isPreview: false,
        comments:{ default(){ return []; }}
    }
}
</script>