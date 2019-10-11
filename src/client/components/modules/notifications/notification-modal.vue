<template>

    <modal ref="modal" :show-background="showBackground" :show-close-button="false"  modal-class="notification-modal-class sticky" :show-content="showNotificationModal">
        <div slot="content" >

            <div class="notification-modal" >

                <img :src="logo.image" :alt="logo.name" class="logo hiddenMobile" >

                <div >
                    <span>
                        <i class="fa fa-bell"></i>
                        Would you like to receive notifications when people reply to your posts?
                    </span>
                    <br/>

                    <div class="notification-modal-button" style="text-align: right">
                        <span @click="blockNotifications">Block</span>
                        <span @click="allowNotifications">Allow</span>
                    </div>

                </div>

            </div>

        </div>
    </modal>

</template>

<script>

import Modal from "client/components/UI/modal/modal"
import consts from "consts/consts"
import constsSecret from "consts/consts-secret"

import PushJS from "push.js"

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default {

    components: { Modal },

    computed:{

        logo(){
            return {
                name: consts.name,
                image: consts.logo,
            }
        }

    },

    data(){
        return {
            showNotificationModal: true,
            showBackground: false,
        }
    },

    methods: {

        showModal(){
            this.$refs['modal'].showModal();
        },

        closeModal(){
            this.$refs['modal'].closeModal();
        },

        blockNotifications(){
            this.closeModal();
        },

        allowNotifications(){

            this.showNotificationModal = false;
            this.showBackground = true;

            PushJS.Permission.request( (e) => this.notificationRequest(true) , ()=> this.notificationRequest(false) );

        },

        async notificationRequest(value){

            if (value) {
                const data = PushJS.Permission.get();
                console.log("permission", data);
            }

            const register = await navigator.serviceWorker.register('sw.js', {
                scope: '/'
            });

            if(register.installing) console.log('Service worker installing');
            else if(register.waiting) console.log('Service worker installed');
            else if(register.active) console.log('Service worker active');


            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(constsSecret.vapid.publicKey),
            });

            console.log("subscription", subscription);

            try{

                const out = await this.$root.networkHelper.post('/notifications/subscribe', {subscription: subscription.toJSON() } );

            }catch(err){

            }

            this.showBackground = false;
            this.closeModal();
        }

    },

    mounted(){

        if (typeof window === "undefined") return;

        const permission = PushJS.Permission.has();
        if ( permission ) return;

        this.showModal();

    }

}
</script>

<style>

.notification-modal-class{
    top: 65px;
    transform: translate(-50%, 0);
    z-index: 10000;
    max-width: 450px;
}

.notification-modal{
    padding: 15px;
}

.notification-modal .logo{

    height: 80px;
    float: left;
    padding-right: 20px;
}

.notification-modal div{
    padding-top: 10px;
}

.notification-modal .notification-modal-button span{
    cursor: pointer;
}

.notification-modal .notification-modal-button span:first-child{
    padding-right: 30px;
    margin-right: 20px;
}

.notification-modal .notification-modal-button span:nth-child(2){
    padding-left: 30px;
    padding-right: 30px;
    border: 1px solid #D0D0D0;
}

@media only screen and (max-width: 600px) {

    .notification-modal-class{
        margin-top: -70px;
        top:100%
    }

}

</style>