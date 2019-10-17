<template>
    <div>

        <notification v-for=" (notification, index) in notifications"
                      :key="index"
                      :notification="notification"
                      @closeMenu="closeMenu">

        </notification>

        <infinite-scroll @onScroll="onScrollLoad" :hasMore="hasMore"/>

    </div>
</template>

<script>

import InfiniteScroll from "client/components/UI/elements/waypoint/infinite-scroll"
import Notification from "./notification"

export default {

    components: {InfiniteScroll, Notification},

    computed:{
        hasMore(){
            return this.$store.state.notifications.pageMore;
        },

        notifications(){
            return this.$store.getters.getNotifications();
        },

    },

    methods: {

        closeMenu(){
            this.$emit('closeMenu');
        },

        async onScrollLoad(resolver){

            await this.$store.dispatch('NOTIFICATIONS_GET', {searchRevert: true, index: this.$store.state.notifications.pageIndex, count: this.$store.state.notifications.pageCount });
            resolver(true);
        },

    },

    mounted(){
        return this.$store.dispatch('NOTIFICATIONS_CLEAR');
    }

}
</script>