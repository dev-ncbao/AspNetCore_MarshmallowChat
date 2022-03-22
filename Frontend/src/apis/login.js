import api from './../apis';
import { HTTP_METHOD } from '../constants/api';

const paths = {
    origin: '/login'
}

export const post = async (body) => {
    const response = await api(paths.origin, HTTP_METHOD.POST, body);
    if(response) return response;
}
