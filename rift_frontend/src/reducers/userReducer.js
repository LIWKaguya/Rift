const userReducer = (state = 'ALL', action) => {
    switch(action.type) {
        case 'ADD' :
            return action.data
        default:
            return state
    }
}

export default userReducer