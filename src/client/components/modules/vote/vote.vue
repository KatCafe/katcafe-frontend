<template>
    <div class="voting-box">
        <div class="upvote" :class="myVote === 1 ? 'voted' : ''" @click="voteUp" ></div>
        <span>{{votes}} </span>
        <div class="downvote" :class="myVote === -1 ? 'voted' : ''" @click="voteDown"></div>
    </div>
</template>

<script>

import NetworkHelper from "modules/network/network-helper"
import Vue from 'vue'

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

                if ( out.prevVote ){

                    if (out.prevVote === 1) this.parent.votesUp = (this.parent.votesUp || 0) -1; else
                    if (out.prevVote === -1) this.parent.votesDown = (this.parent.votesDown || 0) - 1;

                }

                if (out.vote.value === 1) this.parent.votesUp = (this.parent.votesUp || 0) +1; else
                if (out.vote.value === -1) this.parent.votesDown = (this.parent.votesDown||0) +1;

                Vue.set(this.parent, 'myVote', out.vote.value );

            }

        },

    },

}
</script>

<style>

    .voting-box{
        padding-left: 0;
        padding-top: 10px;
        text-align: center;
    }


    .voting-box span{
        margin-left: 1px;
    }

    .upvote {
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 8px solid #9b9b9b;
        margin: 0 auto;
        margin-bottom: 7px;
        cursor: pointer;
    }

    .upvote:after {
        width: 4px;
        height: 6px;
        background-color: #9b9b9b;
        content: '';
        position: absolute;
        margin-top: 8px;
        margin-left: -2px;
        cursor: pointer;
    }

    .voting-box span{
        padding-left: 0;
        color: #9b9b9b;
        font-size: 14px;
    }

    .downvote {
        margin: 0 auto;
        margin-top: 7px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #9b9b9b;
        cursor: pointer;
    }

    .downvote:after {
        width: 4px;
        height: 6px;
        background-color: #9b9b9b;
        content: '';
        position: absolute;
        margin-left: -2px;
        margin-top: -14px;
        cursor: pointer;
    }

    .voted{
        border-top-color: red;
        border-bottom-color: red;
        cursor: default;
    }

    .voted:after{
        background-color: red;
        cursor: default;
    }

</style>