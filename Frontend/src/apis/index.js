import { SERVER_URL, HTTP_METHOD, STATUS_CODE } from "../constants/api";
import { cookie as cookieConstant } from "../constants";
import { cookie as cookieUtil } from './../utils';

const api = async (path, method, body, headers) => {
    await refreshToken();
    const cookies = cookieUtil.cookieToObject();
    const response = await fetch(`${SERVER_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
            Authorization: `Bearer ${(cookies && cookies.token) || null}`,
            ...headers
        },
        method: method,
        body: body,
    });
    return response;
}

const refreshToken = async () => {
    const expireTime = cookieUtil.checkCookieExpire();
    if (expireTime && expireTime === true) {
        const cookies = cookieUtil.cookieToObject();
        if (cookies) {
            if (cookies.token) {
                await fetch(`${SERVER_URL}/login/check`, {
                    headers: {
                        'Content-Type': 'application/json',
                        credentials: 'include',
                        Authorization: `Bearer ${cookies.token || null}`
                    },
                    method: HTTP_METHOD.GET,
                })
                    .then(res => {
                        if (res.status === STATUS_CODE.UNAUTHORIZED) return;
                    })
                    .catch(err => {

                    });
            }
            if (cookies.userId) {
                await fetch(`${SERVER_URL}/login/refresh/${cookies.userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        credentials: 'include',
                        Authorization: `Bearer ${cookies.token || null}`
                    },
                    method: HTTP_METHOD.GET,
                })
                    .then(res => res.json())
                    .then(data => {
                        document.cookie = `${cookieConstant.TOKEN}=${data.token}`;
                        localStorage.setItem(cookieConstant.EXPIRE_TIME, data.expireTime);
                    })
                    .catch(err => {

                    });
            }
        }
    }
}

export default api;

export * as login from './login';
export * as register from './register';