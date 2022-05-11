const { cookie: {TOKEN}, common: {SERVER_URL} } = require('../constants')

const api = async (path, method, body, headers, token) => {
    const response = await fetch(`${SERVER_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...headers
        },
        method: method,
        body: body
    })
    return response;
}

module.exports = {
    api
}