import api from './index'
import { https, apis } from './../constants'

export const get = async (userId, roomId, length) => await api(apis.MESSAGE.MESSAGE_GET(userId, roomId, length), https.HTTP_METHOD.GET)
