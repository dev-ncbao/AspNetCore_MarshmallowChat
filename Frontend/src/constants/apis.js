import { helper } from './../utils'

// common
const login = 'login'
const logout = 'logout'
const check = 'check'
const user = 'user'
const room = 'room'
const rooms = 'rooms'
const info = 'info'
const friend = 'friend'
const invitation = 'invitation'
const suggestion = 'suggestion'
const message = 'message'
// message
export const MESSAGE = {
    MESSAGE_GET: (userId, roomId, length) => helper.combinePath(user, userId, room, roomId, message, length)
}
// login
export const LOGIN = {
    LOGIN: helper.combinePath(login),
    LOGOUT: helper.combinePath(logout),
    CHECK: helper.combinePath(login, check)
}
// user
export const USER = {
    USER_GET: (userId) => helper.combinePath(user, userId)
}
// friend
export const FRIEND = {
    FRIEND_DELETE: (userId, friendId) => helper.combinePath(user, userId, friend, friendId),
    FRIEND_POST: (userId, friendId) => helper.combinePath(user, userId, friend, friendId),
    FRIEND_GET: (userId, length) => helper.combinePath(user, userId, friend, length),
    INVITATION_GET: (userId, length) => helper.combinePath(user, userId, friend, invitation, length),
    INVITATION_POST: (userId, strangerId) => helper.combinePath(user, userId, friend, invitation, strangerId),
    INVITATION_DELETE: (userId, strangerId) => helper.combinePath(user, userId, friend, invitation, strangerId),
    SUGGESTION: (userId, length) => helper.combinePath(user, userId, friend, suggestion, length)
}
// room
export const ROOM = {
    ROOM_GET: (userId, roomId) => helper.combinePath(user, userId, room, roomId, info),
    ROOM_LIST_GET: (userId) => helper.combinePath(user, userId, rooms)
}