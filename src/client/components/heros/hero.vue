<template>

    <div id="hero" class="hero" :style="`background: url('${cover}') center top / cover no-repeat rgb(0, 112, 193); `">

        <div class="heroBox">
            <div v-if="icon">
                <img class="logo" :src="icon">
            </div>
            <div>
                <h1 class="title" :style="titleStyle" >{{title}}</h1>
            </div>
        </div>

    </div>

</template>

<script>
export default {

    props: {
        cover: {
            default: 'https://styles.redditmedia.com/t5_2cneq/styles/bannerBackgroundImage_6yzzdjhguh521.jpeg?format=pjpg&s=8c0a444089bdc858bd2764f5376352e7c5d27f5a',
        },
        title: {
            default: '',
        },
        titleStyle:{
            default: '',
        },
        icon: {
            default: '',
        }
    }

}
</script>
