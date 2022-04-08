import api from "./../apis";
import { apis } from './../constants'
import { https } from '../constants'

export const get = async (userId, length) => await api(apis.FRIEND.FRIEND_GET(userId, length), https.HTTP_METHOD.GET)

export const post = async (userId, friendId) => await api(apis.FRIEND.FRIEND_POST(userId, friendId), https.HTTP_METHOD.POST)

export const inviation = async (userId, length) => await api(apis.FRIEND.INVITATION(userId, length), https.HTTP_METHOD.GET)