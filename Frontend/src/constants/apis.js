const loginPrefix = '/login'
const userPrefix = '/user'
const friendPrefix = '/friend'
// login
export const LOGIN = {
    LOGIN: loginPrefix,
    LOGOUT: '/logout',
    CHECK: `${loginPrefix}/check`
}
// user
export const USER = {
    USER: userPrefix
}
// friend
export const FRIEND = {
    FRIEND_POST: (userId, friendId) => `${userPrefix}/${userId}${friendPrefix}/${friendId}`,
    FRIEND_GET: (userId, length) => `${userPrefix}/${userId}${friendPrefix}/${length}`,
    INVITATION: (userId, length) => `${userPrefix}/${userId}${friendPrefix}/invitation/${length}`
}