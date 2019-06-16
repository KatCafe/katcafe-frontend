export default {


    SET_COMMENTS:  (state, comments ) => {

        state.list = comments;

    },

    ADD_COMMENT: (state, comment)=>{

        state.list.push(comment);

    }


}