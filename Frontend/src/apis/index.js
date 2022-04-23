import { cookie } from './../utils';
import { cookies, https } from './../constants'

const api = async (path, method, body, headers) => {
    const cookiesObj = cookie.cookieToObject();
    const response = await fetch(`${https.SERVER_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(cookiesObj && cookiesObj[cookies.TOKEN]) || null}`,
            ...headers
        },
        credentials: 'include',
        method: method,
        body: body
    })
    return response;
}

export default api;

export * as login from './login';
export * as user from './user';
export * as friend from './friend'
export * as room from './room'
export * as message from './message'