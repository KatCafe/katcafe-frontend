export default {

    getNotifications: (state => ( sortField = 'date', value = 1, filter,  )=>{

        let list = Object.values( state.map );

        if (filter)
            list = list.filter ( it => filter(it) );

        return list.sort( (a, b) => ( a[sortField] < b[sortField] ) ? value : -value );

    }),

}