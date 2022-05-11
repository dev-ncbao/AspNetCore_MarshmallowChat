const combinePath = (...routes) => {
    return '/' + routes.reduce((prev, cur) => `${prev}/${cur}`)
}

module.exports = {
    combinePath
}