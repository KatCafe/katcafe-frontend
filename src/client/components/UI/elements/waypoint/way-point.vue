<template>
    <div ref="ref"/>
</template>

<script>
export default {

    mounted(){

        if (typeof window === "undefined") return;
        window.addEventListener('scroll', this.scrollEvent );

        this.scrollEvent();

    },

    data(){
        return{
            fired: false,
        }
    },

    props:{
        distance : {default: 100},
        checkVisible: {default: false}
    },

    //@onScroll
    methods: {

        scrollEvent() {

            try {

                if (!this.$refs['ref']) return;

                const divTop = this.$refs['ref'].offsetTop;

                const windowHeight = window.outerHeight || document.body.offsetHeight;

                const diff = divTop - window.scrollY - windowHeight;

                if (diff <= this.distance && ( !this.checkVisible || diff > -windowHeight )) {

                    if (!this.fired ) {
                        this.fired = true;
                        this.$emit('shown');
                    }

                } else
                    this.fired = false;

            } catch (err) {
                //console.error("Error loading more data", err);
            }

        },

    }

}
</script>