import api from './../apis';
import { apis } from './../constants'
import { https } from '../constants'

export const get = (userId, roomId) => api(apis.ROOM.ROOM_GET(userId, roomId), https.HTTP_METHOD.GET)

export const get_list = (userId, body) => api(apis.ROOM.ROOM_LIST_GET(userId), https.HTTP_METHOD.POST, body)

