<template>

    <div class="notification">

        <router-link :to="notification.payload.url" @click="markNotificationRead">

            <div :class="`notification-box ${notification.payload.icon ? 'has-icon' : ''} ${notification.unread ? 'unread' : ''} `">

                <img v-if="notification.payload.icon" :src="notification.payload.icon">

                {{notification.payload.title}} "{{notification.payload.body}}"

            </div>

        </router-link>

    </div>

</template>

<script>
export default {

    props: {
        notification: {default:  undefined},
    },

    methods:{

        markNotificationRead(){

        }

    }

}
</script>

<style>

.notification{
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 5px;
}

.notification-box{
    padding: 8px;
}

.notification .has-icon{
    grid-template-columns: 64px 1fr;
}

.notification > .unread{
    background-color: #eae5ff;
}


</style>