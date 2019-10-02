<template>

    <div  class="infinite-scroll">

        <way-point @shown="scrollFired" :distance="distance "/>

        <icon v-if="loading" icon="loading-spinner" class="fa-5x" />

        <br/>

        <div class="pagination">
            <router-link v-if="infinitePrevUri" :to="infinitePrevUri" class="previous">&laquo;</router-link>
            <router-link v-if="infiniteNextUri" :to="infiniteNextUri" class="next">&raquo;</router-link>
        </div>

    </div>

</template>


<script>

import Icon from "client/components/UI/elements/icons/icon"
import WayPoint from "./way-point"

export default{

    components: { Icon, WayPoint },

    props:{

        hasMore: {default: true},
        distance : {default: 100},

        infinitePrevUri: {default: ''},
        infiniteNextUri: {default: ''},

    },
    data(){
        return {
            loading: false,
        }
    },
    //@onScroll
    methods:{

        scrollFired(){

            try{

                if (!this.hasMore) return;
                if (this.loading) return;

                this.loading = true;

                this.$emit('onScroll', ()=> {
                    this.continueScroll();
                });


            }catch(err){
                //console.error("Error loading more data", err);
            }

        },

        continueScroll(){

            //make sure the elements were loaded
            setTimeout( () => this.loading = false, 1000);
        }

    }
}
</script>

<style>

    .infinite-scroll{
        text-align: center;
    }

    .pagination{
        display: none;
    }
</style>