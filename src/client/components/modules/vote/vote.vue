<template>
    <div class="votingBox">
        <div class="upvote" :class="myvote === 1 ? 'voted' : ''" @click="voteUp" ></div>
        <span>{{votes}} </span>
        <div class="downvote" :class="myvote === -1 ? 'voted' : ''" @click="voteDown"></div>
    </div>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"

export default {

    props: {
        parent: null,

        myvote: 0,

        value: 0,
        slug: '',
        parentType: '',
    },

    computed:{

        votesUp(){
            return this.parent.votesUp || 0;
        },

        votesDown(){
            return this.parent.votesDown || 0;
        },

        votes(){
            return this.votesUp - this.votesDown;
        }


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

                if (out.prevVote){
                    if (out.prevVote === 1) this.parent.votesUp = (this.parent.votesUp || 0) -1; else
                    if (out.prevVote === -1) this.parent.votesDown = (this.parent.votesDown || 0) - 1;
                }

                if (out.vote.value === 1) this.parent.votesUp = (this.parent.votesUp || 0) +1; else
                if (out.vote.value === -1) this.parent.votesDown = (this.parent.votesDown||0) +1;

                this.parent.myvote = out.vote.value;

            }

        },

    },

}
</script>