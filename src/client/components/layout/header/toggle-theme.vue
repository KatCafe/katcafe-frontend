<template>

    <div class="toggle-theme">
        <button>
            <i class="fa fa-sun-o" @click="setTheme('dark')"></i>
        </button>
        <button>
            <i class="fa fa-moon-o" @click="setTheme('light')"></i>
        </button>
    </div>

</template>

<script>
export default {

    mounted(){

        if (typeof window === "undefined") return;

        const value = localStorage.getItem('theme');
        if (value)
            this.setTheme(value, false);

    },

    methods:{

        setTheme(name, save = true){

            document.documentElement.setAttribute('data-theme', name);

            if (save)
                localStorage.setItem('theme', name); //add this

        }

    }



}
</script>

<style>

    .toggle-theme{
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