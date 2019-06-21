<template>
    <div class="votingBox">
        <div class="upvote" @click="voteUp"></div>
        <span>{{votes}} </span>
        <div class="downvote" @click="voteDown"></div>
    </div>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"

export default {

    props: {
        votes: 0,
        value: 0,
        slug: '',
        parentType: '',
    },

    methods:{

        voteUp(){

            this.voteNow(+1);

        },

        voteDown(){

            this.voteNow(-1);

        },

        async voteNow(value){

            const out = await NetworkHelper.post('/votes/vote',{
                slug: this.slug,
                value: (this.value || 0) + value,
                parentType: this.parentType,
            });

            if (out && out.result && out.vote) {

                console.log(out);

            }

        },

    },

}
</script>