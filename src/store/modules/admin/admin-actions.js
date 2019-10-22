import Vue from 'vue'

export default {

    ADMIN_BAN: async  function ({ commit, dispatch, state }, {username, ipAddress} ) {

        try{

            const out = await this.$app.networkHelper.get(`/trials/block-user`, { username, ipAddress, days: 7 });

        }catch(err){
            console.error(err);
        }

    },

}
