<template>
    <div class="voting-box">
        <icon  icon="caret-up" :class="`upvote fa ${myVote === 1 ? 'voted' : ''}`" @click="voteUp"/>
        <icon icon="loading-spinner" v-if="loading" />
        <div v-if="!loading"> {{votes}} </div>
        <icon icon="caret-down" :class="`downvote fa fa-caret-down ${myVote === -1 ? 'voted' : ''}`" @click="voteDown"/>
    </div>
</template>

<script>

import Vue from 'vue'
import Icon from "client/components/UI/elements/icons/icon"

export default {

    components: {Icon},

    props: {
        parent: null,

        myVote: 0,

        slug: '',
        parentType: '',
    },

    data(){
        return {
            loading: false,
        }
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

            this.loading = true;

            const newVote = Math.max( Math.min( (this.myVote || 0) + value, 1), -1 );

            console.log("Value", value, this.myVote, "myvote", "it will be:", newVote );


            Vue.set(this.parent, 'myVote', newVote );

            try{

                const out = await this.$root.networkHelper.post('/votes/vote',{
                    slug: this.slug,
                    value: newVote,
                    parentType: this.parentType,
                });

                if (out  && out.vote) {

                    if ( out.prevVote ){

                        if (out.prevVote === 1) Vue.set(this.parent, 'votesUp', (this.parent.votesUp || 0) -1); else
                        if (out.prevVote === -1) Vue.set(this.parent, 'votesDown', (this.parent.votesDown || 0) - 1);

                    }

                    if (out.vote.value === 1) Vue.set(this.parent, 'votesUp', (this.parent.votesUp || 0) +1); else
                    if (out.vote.value === -1) Vue.set(this.parent, 'votesDown', (this.parent.votesDown||0) +1);

                    Vue.set(this.parent, 'myVote', out.vote.value );

                }

            }catch(err){
                console.error("Error Voting", err);
            }

            this.loading = false;
        },

    },

}
</script>

<style>

    .voting-box{
        padding-left: 0;
        text-align: center;
    }


    .voting-box span{
        margin-left: 1px;
    }

    .upvote {
        top: 0;
        display: block;
    }

    .voting-box div{
        display: block;
        color: #9b9b9b;
        font-size: 14px;
    }

    .downvote {
        top: 0;
        display: block;
    }

    .voted{
        color: red;
        cursor: default;
    }

    .voted:hover{
        color: red;
    }


</style>