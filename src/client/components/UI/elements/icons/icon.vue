<template>


    <i :class="getIcon"></i>

</template>

<script>


export default {


    props: {
        icon: {default: 'loading-spinner'},

    },

    computed: {

        getIcon(){

            switch (this.icon){

                case 'loading-spinner': return 'fa fa-refresh fa-spin fa-fw';
                case 'send':return 'fa fa-send';

                default: return'fa fa-send';
            }
        }

    }

}
</script>