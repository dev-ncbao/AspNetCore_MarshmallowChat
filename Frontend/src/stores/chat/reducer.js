import * as types from './type'

const initialState = {
    rooms: [],
    room: {
        members: [],
        messages: [],
        info: {

        }
    },
    activeRoom: 0
}

const reducer = (state, action) => {
    const newState = {...state}
    switch (action.type) {
        case types.ADD_MESSAGE:
            newState.room.messages.push(action.payload)
            console.log(newState.room.messages)
            return newState
        case types.SET_ROOMS_INFO:
            newState.room.info = action.payload
            return newState
        case types.SET_MEMBERS:
            newState.room.members = action.payload
            return newState
        case types.SET_MESSAGES:
            newState.room.messages = action.payload
            return newState
        case types.SET_ROOMS:
            newState.rooms = [...newState.rooms, ...action.payload]
            if(newState.activeRoom === 0) newState.activeRoom = newState.rooms[0]
            return newState
        case types.SET_ACTIVE_ROOM:
            newState.activeRoom = action.payload
            newState.room.messages = []
            newState.room.members = []
            newState.room.info = {}
            return newState
        default: throw new Error('Invalid action');
    }
}

export default reducer
export { initialState }