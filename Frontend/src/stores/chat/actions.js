import * as types from './types'

export const addRoom = (payload) => ({
    type: types.ADD_ROOM,
    payload
})
export const addRooms = (payload) => ({
    type: types.ADD_ROOMS,
    payload
})

export const addNewMessage = (payload) => ({
    type: types.ADD_NEW_MESSAGE,
    payload
})
export const addOldMessage = (payload) => ({
    type: types.ADD_OLD_MESSAGE,
    payload
})
export const updateActiveRoom = (payload) => ({
    type: types.UPDATE_ACTIVE_ROOM,
    payload
})
export const updateRoomLastMessage = (payload) => ({
    type: types.UPDATE_ROOM_LAST_MESSAGE,
    payload
})
