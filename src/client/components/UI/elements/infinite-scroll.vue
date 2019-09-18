<template>

    <div ref="refInfinite"  class="infiniteScroll">

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

            if (!this.hasMore) return;
            if (this.loading) return;

            let divTop = this.$refs['refInfinite'].offsetTop;

            let windowHeight = window.outerHeight||document.body.offsetHeight;

            let diff = divTop - window.scrollY  - windowHeight ;

            if (diff <= this.distance ){

                this.loading = true;

                this.$emit('onScroll', diff);

            }

        },

        continueScroll(){

            //make sure the elements were loaded
            setTimeout( () => {
                this.loading = false;
            }, 1000);
        }

    }
}
</script>