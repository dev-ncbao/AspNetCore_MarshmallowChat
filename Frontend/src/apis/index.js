import { SERVER_URL, HTTP_METHOD } from "../constants/api";
import { cookie as cookieConstant } from "../constants";
import { cookie as cookieUtil } from './../utils';

const api = async (path, method, body, headers) => {
    await refreshToken();
    const response = await fetch(`${SERVER_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
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
        await fetch(`${SERVER_URL}/login/refresh/${cookies.userId}`, {
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include'
            },
            method: HTTP_METHOD.GET,
        })
            .then(res => res.json())
            .then(data => {
                document.cookie = `${cookieConstant.token}=${data.token}`;
                localStorage.setItem(cookieConstant.expireTime, data.expireTime);
            })
            .catch(err => {

            });

    }
}

export default api;

export * as login from './login';
export * as register from './register';