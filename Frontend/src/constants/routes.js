export const ALLOW_ANONYMOUS = [
    '/login',
    '/register',
    '/reset-password'
]

export const ROUTES = {
    HOME: '/',
    CHAT: (roomId) => roomId ? `/chat/${roomId}` : '/chat',
    CONTACT: '/contact',
    RESET_PASSWORD: '/reset-password',
    REGISTER: '/register',
    LOGIN: '/login'
}