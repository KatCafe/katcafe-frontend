<template>

    <div class="notification" @click="markNotificationRead">

        <router-link :to="notification.payload.url"  >

            <div :class="`notification-box ${notification.payload.icon ? 'has-icon' : ''} ${notification.unread ? 'unread' : ''} `">

                <img class="img-circle" v-if="notification.payload.icon" :src="notification.payload.icon">

                <span v-html="getBody">
                </span>

            </div>

        </router-link>

    </div>

</template>

<script>
export default {

    props: {
        notification: {default:  undefined},
    },

    computed:{

        getBody(){
            return `${this.notification.payload.title} "${this.notification.payload.body}"`;
        }

    },

    methods:{

        markNotificationRead(){
            this.$emit('closeMenu');
            return this.$store.dispatch('NOTIFICATIONS_MARK_NOTIFICATION_READ', {notificationId: this.notification.uuid, value: true });
        }

    }

}
</script>

<style>

.notification{

    border-top: solid 1px rgba(100, 100, 100, .20);
    border-bottom: solid 1px rgba(100, 100, 100, .20);
}

.notification-box{
    padding: 4px 8px 4px 8px;
    display: grid;
    grid-template-columns: 1fr;
}

.notification .has-icon{
    grid-template-columns: 55px 1fr;
}

.notification img{
    width: 48px;
    height: 48px;
}

.notification .unread{
    background-color: #eae5ff;
}

.notification-box span{
    font-size: 13px;
}

</style>