import api from './../apis';
import { HTTP_METHOD } from '../constants/api';

const paths = {
    origin: '/login',
    check: '/login/check'
}

export const check = async () => {
    const response = await api(paths.check, HTTP_METHOD.GET);
    if(response) return response;
}

export const post = async (body) => {
    const response = await api(paths.origin, HTTP_METHOD.POST, body);
    if(response) return response;
}
