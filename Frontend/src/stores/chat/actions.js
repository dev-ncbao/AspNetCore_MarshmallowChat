import * as types from './type'

export const addMessage = (payload) => ({
    type: types.ADD_MESSAGE,
    payload
})

export const setRoomInfo = (payload) => ({
    type: types.SET_ROOMS_INFO,
    payload
})

export const setMembers = (payload) => ({
    type: types.SET_MEMBERS,
    payload
})

export const setMessages = (payload) => ({
    type: types.SET_MESSAGES,
    payload
})

export const setRooms = (payload) => ({
    type: types.SET_ROOMS,
    payload
})

export const setActiveRoom = (payload) => ({
    type: types.SET_ACTIVE_ROOM,
    payload
})

