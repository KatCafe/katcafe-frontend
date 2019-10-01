<template>

    <div ref="refInfinite"  class="infinite-scroll">

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

export default{

    components: { Icon },

    mounted(){

        if (typeof window === "undefined") return;
        window.onscroll  = this.scrollEvent;

    },
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

        scrollEvent(){

            try{

                if (!this.hasMore) return;
                if (this.loading) return;

                const divTop = this.$refs['refInfinite'].offsetTop;

                const windowHeight = window.outerHeight||document.body.offsetHeight;

                const diff = divTop - window.scrollY  - windowHeight ;

                if (diff <= this.distance ){

                    this.loading = true;

                    this.$emit('onScroll', ()=> {
                        this.continueScroll();
                    });

                }

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