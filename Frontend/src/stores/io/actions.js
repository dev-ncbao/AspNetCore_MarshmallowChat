import * as types from './types'

export const setSocketSession = (payload) => ({
    type: types.SET_SOCKET,
    payload
})