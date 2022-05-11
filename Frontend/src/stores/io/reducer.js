import * as types from './types'

const initState = {
   socketSession: null
}

const reducer = (state, action) => {
    const newState = { ...state }
    switch (action.type) {
        case types.SET_SOCKET:
            newState.socketSession = action.payload
            /* console.log(newState) */
        return newState
        default:
            return console.log('Invalid action');

    }
}

export default reducer
export { initState }