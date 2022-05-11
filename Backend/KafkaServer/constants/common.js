const DEVELOPMENT = 'development'
const SERVER_URL = 'https://localhost:44369/api'
const ALLOW_ORIGINS = [
    'http://localhost:3000',
    'https://localhost:3000'
]
const ALLOW_HEADERS = [
    'Content-type',
    'Accept'
]
const SELF_PORT = 3443
const CERT = {
    KEY: './cert/localhost-key.pem',
    CERT: './cert/localhost.pem'
}
const ENV = 'env'
module.exports = {
    ENV,
    DEVELOPMENT,
    SERVER_URL,
    ALLOW_HEADERS,
    ALLOW_ORIGINS,
    SELF_PORT,
    CERT
}