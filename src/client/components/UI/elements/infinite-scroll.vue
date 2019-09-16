<template>

    <div ref="refInfinite"  class="infiniteScroll">

        <!-- 2 -->
        <div v-if="loading" class="loader loader--style2" title="1">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                                  attributeName="transform"
                                  type="rotate"
                                  from="0 25 25"
                                  to="360 25 25"
                                  dur="0.6s"
                                  repeatCount="indefinite"/>
                </path>
            </svg>
        </div>

        <br/>

        <div class="pagination">
            <router-link v-if="infinitePrevUri" :to="infinitePrevUri" class="previous">&laquo;</router-link>
            <router-link v-if="infiniteNextUri" :to="infiniteNextUri" class="next">&raquo;</router-link>
        </div>

    </div>

</template>


<script>
export default{

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