import UserRole from "client/components/modules/auth/user-role"

export default {


    isUserOwner: (state => (object)=>{

        if (!state.user) return false;

        if (state.user.role === UserRole.SYS_ADMIN) return true;
        if (state.user.role === UserRole.MODERATOR) return true;

        return object.owner === state.user.username;
    }),

}