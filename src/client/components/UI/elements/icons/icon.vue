<template>

    <i :class="getIcon" @click="click" />

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
                case 'spinner': return 'fa fa-refresh';
                case 'send':return 'fa fa-send';
                case 'times':return 'fa fa-times';
                case 'times-circle':return 'fa fa-times-circle';
                case 'camera':return 'fa fa-camera';
                case 'comments':return 'fa fa-comments';
                case 'pencil':return 'fa fa-pencil';
                case 'comment':return 'fa fa-comment';

                default: return'fa fa-send';
            }
        }

    },

    methods: {

        click(e){

            this.$emit('click', e);

        },

    },

}
</script>