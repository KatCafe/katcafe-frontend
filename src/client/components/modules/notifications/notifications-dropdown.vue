<template>

    <div class="notifications-dropdown" v-click-outside="closeMenu">
        <h3>Notifications</h3>
        <div style="height:300px;"></div>
        <div class="see-all">
            <router-link to="/notifications">
                See All
            </router-link>
        </div>
    </div>

</template>

<script>
export default {

    props:{

        enableCloseMenu: {default: false},

    },

    methods: {

        closeMenu(){

            if (this.enableCloseMenu)
                this.$emit('closeMenu');
        }

    }

}
</script>

<style>
    .see-all {
        background:#F6F7F8;
        padding:8px;
        font-size:12px;
        font-weight:bold !important;
        border-top:solid 1px rgba(100, 100, 100, .30);
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
        font: 13px helvetica;
        font-weight: 700;
        font-size: 13px;
        font-style: normal;
        border-bottom: solid 1px rgba(100,100,100,.3);
        padding: 8px;
    }


</style>