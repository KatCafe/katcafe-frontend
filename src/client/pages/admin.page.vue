<template>

    <layout >

        <div slot="content"  >

            <div class="popup">

                <form class="form" action="#" >

                    <label >Channels</label>
                    <button type="button" class="btn btn-primary" @click="()=>updatesFromAllChannels('remove-wrong-data')">Remove wrong/corrupted topics from all channels</button>
                    <button type="button" class="btn btn-primary" @click="()=>updatesFromAllChannels('update-scores')">Update scores from all channels</button>

                    <div v-if="error" class="alert-box error"><span>error <br/><br/> </span> {{error}}</div>
                    <div v-if="success" class="alert-box success"><span>success <br/><br/> </span> {{success}}</div>

                </form>

            </div>


        </div>

    </layout>

</template>

<script>

import Layout from "client/components/layout/layout"

export default {

    components: { Layout },

    data(){
        return {
            error: '',
            success: '',
        }
    },

    computed: {

    },

    methods:{

        async updatesFromAllChannels(command){

            console.log(this);

            this.error, this.success = '';

            try {
                const out = await this.$root.networkHelper.post('/admin/'+command, {channels: []});
                this.success = 'Scores had been updated' + JSON.stringify(out);
            }catch(err){
                this.error = err.message;
            }

        }

    },


}
</script>
