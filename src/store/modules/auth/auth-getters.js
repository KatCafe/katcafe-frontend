import UserRole from "client/components/modules/auth/user-role"

export default {

    isUserOwner: (state => (objects)=>{

        const user = state.user;

        if (!user) return false;

        if (user.role === UserRole.SYS_ADMIN) return true;
        if (user.role === UserRole.MODERATOR) return true;

        if (!objects) return false;

        if (!Array.isArray(objects)) objects = [];

        return objects.reduce(  ( val, it) => val || ( it && it.owner === user.username) , false );
    }),

    isUserAdmin: (state => user => {

        if (!user) user = state.user;

        if (user.role === UserRole.SYS_ADMIN) return true;

        return false;
    }),

}