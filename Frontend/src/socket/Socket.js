import { io } from 'socket.io-client'
import events from './events';

class Socket {
    constructor(dispatch) {
        this.dispatch = dispatch
        this.socket = io('https://localhost:3443', {
            withCredentials: true,
            extraHeaders: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            }
        });
        events(this.socket, this.dispatch)
    }
}

export default Socket