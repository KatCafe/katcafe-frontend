<template>


    <div class="notifications-bell">

        <div class="bell-cover" @click="toggleMenu">
            <span :class="` ${notificationsUnread ? 'fa-stack has-badge' : ''}`" :data-count="notificationsUnread ? notificationsUnread : ''">
              <i class="fa fa-bell fa-stack-1x fa-inverse"></i>
            </span>
        </div>

        <notifications-dropdown v-if="menuOpen" @closeMenu="closeMenu" :enable-close-menu="enableCloseMenu" ref="ref-notifications-dropdown" />

    </div>

</template>

<script>

import NotificationsDropdown from "./notifications-dropdown"

export default {

    components: {NotificationsDropdown},

    computed:{
        notificationsUnread(){
            return this.$store.state.notifications.unreadCount;
        }
    },

    data(){
        return {
            menuOpen: false,
            enableCloseMenu: false,
        }
    },

    methods:{

        toggleMenu(){

            const newValue = !this.menuOpen;
            if (newValue){

                this.$store.dispatch('NOTIFICATIONS_CLEAR');
                this.enableCloseMenu = false;
                setTimeout(()=>this.enableCloseMenu = true, 100);
            }
            this.menuOpen = newValue;

        },

        closeMenu(){
            this.menuOpen = false;
        }


    },

    mounted(){

        this.$store.dispatch('NOTIFICATIONS_INITIALIZE', { enableInterval: typeof window !== "undefined" });

    },

    watch: {
        menuOpen: function (newValue, oldValue) {

            if (oldValue && !newValue )
                this.$store.dispatch('NOTIFICATIONS_CLEAR_UNREAD_COUNT',)
        },
    }

}
</script>

<style>

    .notifications-bell{
        display: inline-block;
        position: relative;
    }

    .bell-cover {
    }

    .bell-cover i{
        color: var(--primary-color-color);
        font-size: 20px;
        top: 0;
    }

    .bell-cover i:hover{
        color: var(--font-color)
    }

    .bell-cover .fa-stack{
        vertical-align: inherit;
    }

    .bell-cover .fa-stack[data-count]:after{
        position:absolute;
        right:-3px;
        top:0;
        content: attr(data-count);
        font-size: 10px;
        padding:5px;
        border-radius:999px;
        line-height:5px;
        color: white;
        background:rgba(255,0,0,.85);
        text-align:center;
        font-weight:bold;
    }

</style>