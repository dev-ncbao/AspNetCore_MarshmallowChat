import api from './../apis';
import { apis } from './../constants'
import { https } from '../constants'

export const get = async (userId, roomId) => await api(apis.ROOM.ROOM_GET_INFO(userId, roomId), https.HTTP_METHOD.GET)

export const get_find = async (userId, friendId) => await api(apis.ROOM.ROOM_GET(userId, friendId), https.HTTP_METHOD.GET)

export const get_list = async (userId, body) => await api(apis.ROOM.ROOM_LIST_GET(userId), https.HTTP_METHOD.POST, body)

export const get_list_info = async (userId, body) => await api(apis.ROOM.ROOM_LIST_GET_INFO(userId), https.HTTP_METHOD.POST, body)

export const get_members = async (userId, roomId) => await api(apis.ROOM.ROOM_GET_MEMBER(userId, roomId, https.HTTP_METHOD.GET))