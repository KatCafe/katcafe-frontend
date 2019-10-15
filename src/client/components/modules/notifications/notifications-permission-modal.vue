<template>

    <modal ref="modal" :show-background="showBackground" :show-close-button="false"  modal-class="notification-modal-class sticky" :show-content="showNotificationModal" modal-content-class="notification-modal-content-class" :cover-top-bar="true">
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

    for (let i = 0; i < rawData.length; ++i)
        outputArray[i] = rawData.charCodeAt(i);

    return outputArray;
}

export default {

    components: { Modal },

    computed:{

        user(){
            return this.$store.state.auth.user;
        },

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
            register: null,
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

            this.showBackground = false;

            try{

                if (value) {
                    const data = PushJS.Permission.get();
                    console.log("permission", data);


                    let subscription = await this.register.pushManager.getSubscription();

                    if (!subscription)
                        subscription = await this.register.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(constsSecret.vapid.publicKey),
                        });

                    if (subscription) {

                        localStorage.setItem('notificationSubscription', JSON.stringify(subscription))

                        await this.$store.dispatch('NOTIFICATIONS_SUBSCRIBE', {subscription: subscription.toJSON()} );
                    }


                }

            }catch(err){

                console.error(err);

            }

            this.closeModal();
        }

    },

    async mounted(){

        if (typeof window === "undefined") return;

        const registrations = await navigator.serviceWorker.getRegistrations();

        for(let registration of registrations)
            await registration.update();

        const register = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
            // Optionally, set 'scope' here, if needed.
        });

        if(register.installing) console.log('Service worker installing');
        else if(register.waiting) console.log('Service worker installed');
        else if(register.active) console.log('Service worker active');

        this.register = register;

        const hasPermission = PushJS.Permission.has();
        const permission = PushJS.Permission.get();

        if (permission === PushJS.Permission.DENIED) return;

        if ( hasPermission ){

            let subscribed = localStorage.getItem('notificationSubscriptionSubscribed');
            if (subscribed === 'true') return;
            else await this.$store.dispatch('NOTIFICATIONS_SUBSCRIBE', {} );


        }

        this.showModal();

    }

}
</script>

<style>

.notification-modal-class{
    top: 62px;
    transform: translate(+77px, 0);
    left: 0;
    z-index: 10000;
    max-width: 320px;
}

.notification-modal-content-class{
    padding-top: 0;
    padding-bottom: 20px;
}

.notification-modal{
}

.notification-modal .logo{

    height: 60px;
    float: left;
    padding-right: 20px;
    padding-top: 10px;
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
    padding-top: 5px;
    padding-bottom: 5px;
}

.notification-modal .notification-modal-button span:nth-child(2){
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid #D0D0D0;
}

@media only screen and (max-width: 600px) {

    .notification-modal-class{
        margin-top: -70px;
        top:100%;
        margin-left: auto;
        transform: translate(-50%, -50%);
        left: 50%;
    }

}

</style>