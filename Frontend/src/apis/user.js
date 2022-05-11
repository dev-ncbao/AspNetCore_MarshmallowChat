import api from './../apis';
import { apis } from './../constants'
import { https } from '../constants'

export const post = async (body) => await api(apis.USER.USER_POST, https.HTTP_METHOD.POST, body)

export const get = async (userId) => await api (apis.USER.USER_GET(userId), https.HTTP_METHOD.GET)