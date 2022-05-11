import * as types from './types'

const initialState = {
    rooms: [],
    /* messages: [
        {}
    ] */
    messages: [],
    /* activeRoom: number */
    activeRoom: 0
}

const reducer = (state, action) => {
    // chat
    switch (action.type) {
        case types.ADD_NEW_MESSAGE: {
            const message = action.payload
            const index = state.messages.findIndex(mess => mess.MessageId === message.MessageId)
            if (index === -1 && message.RoomId === state.activeRoom)
                return {
                    ...state,
                    messages: [
                        ...state.messages,
                        message
                    ]
                }
            return state
        }
        case types.ADD_OLD_MESSAGE: {
            const messages = action.payload
            const messagesId = state.messages.map(message => message.MessageId)
            const filteredMessages = messages.filter(message => !messagesId.includes(message.MessageId))
            return {
                ...state,
                messages: [
                    ...filteredMessages,
                    ...state.messages
                ]
            }
        }
        case types.ADD_ROOM: {
            const room = action.payload
            const index = state.rooms.findIndex(r => r.RoomId === room.RoomId)
            if (index === -1)
                return {
                    ...state,
                    rooms: [
                        ...state.rooms,
                        room
                    ]
                }
            return state
        }
        case types.ADD_ROOMS: {
            const rooms = action.payload
            const roomsId = state.rooms.map(room => room.RoomId)
            const filteredRooms = rooms.filter(room => !roomsId.includes(room.RoomId))
            if (state.activeRoom === 0 && filteredRooms.length > 0)
                return {
                    ...state,
                    rooms: [
                        ...state.rooms,
                        ...filteredRooms
                    ],
                    activeRoom: filteredRooms[0].RoomId
                }
            return {
                ...state,
                rooms: [
                    ...state.rooms,
                    ...filteredRooms
                ]
            }
        }
        case types.UPDATE_ACTIVE_ROOM: {
            const active = action.payload
            return {
                ...state,
                messages: [],
                activeRoom: active
            }
        }
        case types.UPDATE_ROOM_LAST_MESSAGE: {
            const message = action.payload
            const index = state.rooms.findIndex(room => room.RoomId === message.RoomId)
            if (index !== -1)
                return {
                    ...state,
                    rooms: [
                        ...state.rooms.slice(0, index),
                        message,
                        ...state.rooms.slice(index + 1)
                    ]
                }
            return state
        }
        default: throw new Error('Invalid action');
    }
}

export default reducer
export { initialState }