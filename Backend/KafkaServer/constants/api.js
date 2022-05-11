const { common: {combinePath} } = require('./../helpers')
// common
const login = 'login' 
const authentication = 'authentication'
const topic = 'topic'
const user = 'user'
// authentication
const AUTHENTICATION = {
    CHECK: combinePath(login, authentication)
}
// room
const ROOM = {
    TOPIC_GET: (userId) => combinePath(user, userId, topic)
}

module.exports = {
    AUTHENTICATION,
    ROOM
}