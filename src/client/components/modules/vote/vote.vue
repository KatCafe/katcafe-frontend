<template>
    <div class="votingBox">
        <div class="upvote" :class="myVote === 1 ? 'voted' : ''" @click="voteUp" ></div>
        <span>{{votes}} </span>
        <div class="downvote" :class="myVote === -1 ? 'voted' : ''" @click="voteDown"></div>
    </div>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"

export default {

    props: {
        parent: null,

        myVote: 0,

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

            console.log("Value", value, this.myVote, "myvote", "it will be:",this.myVote ? 0 : value);

            const out = await NetworkHelper.post('/votes/vote',{
                slug: this.slug,
                value: this.myVote ? 0 : value,
                parentType: this.parentType,
            });

            if (out  && out.vote) {

                if (out.prevVote){
                    if (out.prevVote === 1) this.parent.votesUp = (this.parent.votesUp || 0) -1; else
                    if (out.prevVote === -1) this.parent.votesDown = (this.parent.votesDown || 0) - 1;
                }

                if (out.vote.value === 1) this.parent.votesUp = (this.parent.votesUp || 0) +1; else
                if (out.vote.value === -1) this.parent.votesDown = (this.parent.votesDown||0) +1;

                console.log("ups", this.parent.votesUp, "downs", this.parent.votesDown);

                this.parent.myVote = out.vote.value;

            }

        },

    },

}
</script>