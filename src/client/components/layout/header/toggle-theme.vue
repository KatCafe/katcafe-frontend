<template>

    <div class="toggle-theme" >
        <button :class="`${theme === 'light' ? 'activated' : ''}`" @click="setTheme('light')">
            <i class="fa fa-sun-o"></i>
        </button>
        <button :class="`${theme === 'dark' ? 'activated' : ''}`" @click="setTheme('dark')">
            <i class="fa fa-moon-o"></i>
        </button>
    </div>

</template>

<script>
export default {

    data(){
        return {
            theme: '',
        }
    },

    mounted(){

        if (typeof window === "undefined") return;

        const value = localStorage.getItem('theme') || 'light';

        this.theme = value;

    },

    methods:{

        setTheme(name){

            this.theme = name;

        }

    },

    watch: {
        theme: function (newValue, oldValue) {

            console.log(newValue);

            document.documentElement.setAttribute('data-theme', newValue);
            localStorage.setItem('theme', newValue); //add this

        },
    }

}
</script>

<style>

    .toggle-theme{
        padding: 5px 0 0 5px;
        display: inline-block;
    }

    .toggle-theme button{
        height: 20px;
        width: 20px;
        padding: 0;
        margin: 0;
        border-radius: 0;
        display: inline-block;
    }

    .toggle-theme .activated{
        background-color: #8dc647 !important;
    }

    .toggle-theme button:nth-child(1){
        background-color: white;
        color: #4a4a4a;
        margin-right: 5px;
    }

    .toggle-theme button:nth-child(2){
        background-color: #545b62;
        color: white;
    }

    .toggle-theme button:hover{
        background-color: #8dc647;
    }

</style>