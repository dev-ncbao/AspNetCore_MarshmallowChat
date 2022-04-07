import { SERVER_URL, HTTP_METHOD, STATUS_CODE } from "../constants/api";
import { cookie as cookieConstant } from "../constants";
import { cookie as cookieUtil } from './../utils';

const api = async (path, method, body, headers) => {
    const cookies = cookieUtil.cookieToObject();
    const response = await fetch(`${SERVER_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(cookies && cookies.token) || null}`,
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
export * as register from './register';