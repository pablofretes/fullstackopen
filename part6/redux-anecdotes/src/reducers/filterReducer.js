const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTERING': {
            return action.filter
        }
        default: return state
    }
}

export const filtering = filter => {
    return {
        type: 'FILTERING',
        filter,
    }
} 

export default filterReducer