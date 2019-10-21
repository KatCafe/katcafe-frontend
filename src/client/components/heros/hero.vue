<template>

    <div id="hero" class="hero" :style="`background-image: url('${cover}') ; height: ${cover ? 192 : 100}px`">

        <div class="hero-box">
            <template v-if="icon">
                <img class="logo img-circle" :src="icon">
            </template>
            <template>
                <h1 v-if="title" class="title" :style="titleStyle" v-html="title" />
            </template>
        </div>

    </div>

</template>

<script>
export default {

    props: {
        cover: { default: 'https://styles.redditmedia.com/t5_2cneq/styles/bannerBackgroundImage_6yzzdjhguh521.jpeg?format=pjpg&s=8c0a444089bdc858bd2764f5376352e7c5d27f5a', },
        title: { default: '', },
        titleStyle:{ default: '', },
        icon: { default: '', }
    }

}
</script>


<style>

    .hero {
        display: block;
        flex-direction: row;
        height: 192px;
        min-width: 100px;
        background: center top / cover no-repeat #33a8ff;
        margin: 0 auto;
    }

    .hero-box{
        margin-left: 50px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .hero .logo{
        top: -50%;
        position: absolute;

        float: left;
        margin-right: 8px;
        box-sizing: border-box;

    }

    .hero .title{
        padding-left: 70px;
        color: white;
    }


</style>