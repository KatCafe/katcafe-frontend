<template>
    <div>

        <comment v-for="(comment, index) in comments"
                 :key="comment.slug"
                 :name="comment.slug"
                 :comment="comment"
                 :isPreview="isPreview"
                 :isContentDisplay="isContentDisplay"
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
        comments:{ default(){ return []; }},
        isContentDisplay: false,

    }
}
</script>