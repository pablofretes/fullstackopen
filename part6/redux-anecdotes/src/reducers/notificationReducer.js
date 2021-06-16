const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data.notification
        default: return state
    }
}

let timeout;

export const notificationSuccess = (message, seconds) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: {
            notification: message
        }
        })

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION',
                data: {
                    notification: null
                }
            })
        }, seconds * 500)
    }
}

export default notificationReducer