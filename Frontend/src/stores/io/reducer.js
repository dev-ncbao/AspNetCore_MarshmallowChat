import { users } from './../../constants'

const initialState = {
    rooms: [
        {
            roomId: 1,
            members: [
                1, 2
            ],
            lastMessage: {
                messageId: '',
                content: '',
                timeCreated: '',
                owner: '',
                type: ''
            },
            type: '',
            avatar: '',
            name: ''
        }
    ],
    messages: [
        {
            messageId: '',
            content: '',
            timeCreated: '',
            owner: '',
            type: ''
        }
    ]
}

const reducer = (state, action) => {
    switch (action) {

        default: throw new Error('Invalid action');
    }
}

export default reducer
export { initialState }