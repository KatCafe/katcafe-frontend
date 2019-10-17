<template>

    <layout >

        <div slot="content"  >

            <div class="popup">

                <h1>Notifications</h1>

                <form class="form" action="#" >
                    <notifications/>
                </form>

            </div>

        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"
import Notifications from "client/components/modules/notifications/notifications"

export default {

    components: { Layout, Notifications },


}
</script>
