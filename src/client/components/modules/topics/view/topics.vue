<template>

    <div>

        <div class="newPostContainer">

            <div class="newPostContent">

                <div class="replyBox">

                    <img class="profileAvatar" src="/public/assets/anonymus.png">
                    <input type="text" placeholder="New post title"/>
                    <img class="uploadPhoto" src="/public/assets/uploadPhoto.svg">

                </div>

                <div class="messageBox">

                    <div></div>

                    <textarea type="text" placeholder="Your comment..."/>

                    <div></div>

                    <div class="postButton">
                        Post it!
                    </div>

                </div>

            </div>

            <div class="preview">



            </div>

        </div>

        <topic v-for="(topic, index) in topics"
               :key="index"
               :topic="topic"
               :comments="comments.filter( it => it.topic === topic.slug )"
               :isPreview = "true"
               class="topicSeparator"
        />

    </div>

</template>

<script>

import Topic from "./topic"
import Comments from "client/components/modules/comments/view/comments"

export default {

    components: { Topic, Comments },

    props: {

        topics: {default(){return [];}},
        comments: {default(){return [];} },
    }

}
</script>