import { actions as chatActions } from './../stores/chat'

const events = (socket, dispatch) => {
    const receive = (message) => {
        /* console.log(JSON.parse(message), dispatch) */
        dispatch(chatActions.addNewMessage(JSON.parse(message)))
    }

    const connect = () => {
        console.log('connected', socket.id)
    }

    socket.on('chat:receive', receive)
    socket.on('connect', connect)
}

export default events