const blogReducer = (state = 'ALL', action) => {
    switch(action.type) {
        case 'ADD' :
            return action.data
        case 'LIKE' :
            return action.data
        case 'DELETE':
            return action.data
        default:
            return state
    }
}

export default blogReducer