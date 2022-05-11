const { cookie: { toObject } } = require("./../helpers");
const { cookie: { X_COOKIES, TOKEN, USER_ID }, http } = require('./../constants')
const { authentication, room } = require('./../apis')

const onAuthorization = async (socket, next) => {
    if (socket.handshake.headers.cookie) {
        const cookieString = socket.handshake.headers.cookie
        const cookie = toObject(cookieString)
        const response = await authentication.check(
            { [X_COOKIES]: cookieString },
            cookie[TOKEN]
        )
        if (response.status === http.STATUS_CODE.UNAUTHORIZED ||
            response.status === http.STATUS_CODE.SERVER_ERROR) {
            next(new Error('Unauthorized'))
        }
        else {
            socket.user = cookie
            const response = await room.getTopic(
                cookie[USER_ID],
                { [X_COOKIES]: cookieString },
                cookie[TOKEN]
            )
            if (response.status === http.STATUS_CODE.UNAUTHORIZED ||
                response.status === http.STATUS_CODE.SERVER_ERROR) {
                
                next(new Error('Unauthorized'))
            }
            else {
                await response.json().then(data => {
                    socket.topic = data
                })
            }
            next()
        }
    }
    else next(new Error('Unauthorized'))
}

module.exports = {
    onAuthorization
}