const { api } = require('./api')
const {
    api: { ROOM },
    http: { METHOD }
} = require('../constants')

const getTopic = async (userId, headers, token) => await api(ROOM.TOPIC_GET(userId), METHOD.GET, null, headers, token)

module.exports = {
    getTopic
}