<template>
    <div>

        <div  v-for="(comment, index) in comments"
              :key="comment.slug">

            <comment :key="comment.slug"
                     :name="comment.slug"
                     :comment="comment"
                     :isPreview="isPreview"
                     :isContentDisplay="isContentDisplay"
            >

                <div slot="comment-bottom-buttons" v-if="isContentDisplay" >

                    <comment-bottom-buttons :comment="comment" />

                </div>

            </comment>

        </div>


    </div>
</template>

<script>

import Comment from "./comment"
import CommentBottomButtons from "./comment-bottom-buttons"

export default {

    components: { Comment, CommentBottomButtons },

    props: {

        isPreview: false,
        comments:{ default(){ return []; }},
        isContentDisplay: false,

    }
}
</script>