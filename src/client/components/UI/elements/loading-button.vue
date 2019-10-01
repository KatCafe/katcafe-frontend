<template>
    <button type="button" @click="handleClick">

        <icon v-if="loading" style='margin-right:10px' icon="loading-spinner" />

        <template v-else>
            <icon :class="`${text ? 'hiddenDesktop' : ''}`" icon="icon" />
            <span :class="`hiddenMobile`">{{text}}</span>
        </template>


    </button>
</template>

<script>
import icon from "./icons/icon";

export default{

    components: {icon},

    data : function (){
        return {
            loading:false,
            disabled:false,
        }
    },

    props: {
        canDisable: {default: true},
        className: {default: function (){}},
        text: {default: 'Submit'},
        icon : {default: 'send'},
    },

    methods: {

        handleClick(e){

            if (this.disabled && this.canDisable  === true) return false;

            this.loading = true;

            if ( this.canDisable ) this.disabled=true;

            let resolver;
            const promise = new Promise( resolve => {
                resolver = resolve;
            });

            promise.then( answer => {
                this.loading = false;

                if (this.canDisable) this.disabled = false;
            });


            e.stopPropagation();
            this.$emit('onClick', e, resolver );

        },

    }
}
</script>