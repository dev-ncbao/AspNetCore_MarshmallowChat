import { io } from 'socket.io-client'

const socket = io('https://localhost:3443', {
    withCredentials: true,
    extraHeaders: {
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
});

socket.on('chat:receive', data => {
    console.log('receive', data)
})

const initState = {
    socket: socket
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'join':
            console.log(state)
            state.socket.emit('room:join', 1)
            return state
        case 'echo':
            console.log(state)
            state.socket.emit('echo', 'hello')
            return state
        case 'chat:to-room':
            console.log(action.payload)
            state.socket.emit('chat:to-room', action.payload)
            return state
        default:
            return console.log('Invalid action');

    }
}

export default reducer
export { initState }