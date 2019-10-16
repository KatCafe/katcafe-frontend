<template>

    <div class="notifications-dropdown" v-click-outside="closeMenu">

        <h3>Notifications</h3>
        <div class="notifications-box">


            <notification v-for=" (notification, index) in notifications"
                          :key="index"
                          :notification="notification"
                          @closeMenu="closeMenu">

            </notification>

            <infinite-scroll @onScroll="onScrollLoad" :hasMore="hasMore"/>

        </div>
        <div class="see-all">
            <router-link to="/notifications">
                See All
            </router-link>
        </div>
    </div>

</template>

<script>

import InfiniteScroll from "client/components/UI/elements/waypoint/infinite-scroll"
import Notification from "./notification"

export default {

    components: {InfiniteScroll, Notification},

    props:{
        enableCloseMenu: {default: false},
    },

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

            if (this.enableCloseMenu)
                this.$emit('closeMenu');
        },

        async onScrollLoad(resolver){

            await this.$store.dispatch('NOTIFICATIONS_GET', {searchRevert: true, index: this.$store.state.notifications.pageIndex, count: this.$store.state.notifications.pageCount });
            resolver(true);
        },

    },

    mounted(){
        this.$store.dispatch('NOTIFICATIONS_CLEAR');
    }

}
</script>

<style>
    .see-all {
        background:#F6F7F8;
        padding:8px;
        font-size:12px;
        font-weight:bold !important;
        text-align:center;
    }
    .see-all a {
        color:#3b5998;
    }
    .see-all a:hover {
        background:#F6F7F8;
        color:#3b5998;
        text-decoration:underline;
    }

    /* THE NOTIFICAIONS WINDOW. THIS REMAINS HIDDEN WHEN THE PAGE LOADS. */
    .notifications-dropdown {
        width:300px;
        position:absolute;
        top:40px;
        right: 0;
        background:#FFF;
        border:solid 1px rgba(100, 100, 100, .20);
        -webkit-box-shadow:0 3px 8px rgba(0, 0, 0, .20);
        z-index: 0;
    }
    /* AN ARROW LIKE STRUCTURE JUST OVER THE NOTIFICATIONS WINDOW */
    .notifications-dropdown:before {
        content: '';
        display:block;
        width:0;
        height:0;
        color:transparent;
        border:10px solid #CCC;
        border-color:transparent transparent #FFF;
        margin-top:-20px;
        margin-left:92%;
    }

    .notifications-dropdown h3{
        color: #333;
        font-weight: 700;
        font-size: 13px;
        padding: 8px;
        margin-bottom: 0;
    }

    .notifications-box{
        height: 300px;
        overflow-y: scroll;
    }


</style>