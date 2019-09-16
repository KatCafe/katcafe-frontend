import UserRole from "client/components/modules/auth/user-role"

export default {


    isUserOwner: (state => (object)=>{

        const user = state.user;

        if (!user) return false;

        if (user.role === UserRole.SYS_ADMIN) return true;
        if (user.role === UserRole.MODERATOR) return true;

        return object.owner === user.username;
    }),

}