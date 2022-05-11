const { api } = require('./api')
const {
    api: { AUTHENTICATION },
    http: { METHOD }
} = require('../constants')

const check = async (headers, token) => await api(AUTHENTICATION.CHECK, METHOD.GET, null, headers, token)

module.exports = {
    check
}