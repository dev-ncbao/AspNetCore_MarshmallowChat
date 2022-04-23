import api from "./../apis";
import { apis } from './../constants'
import { https } from '../constants'

export const friendGet = async (userId, length) => await api(apis.FRIEND.FRIEND_GET(userId, length), https.HTTP_METHOD.GET)

export const friendPost = async (userId, friendId) => await api(apis.FRIEND.FRIEND_POST(userId, friendId), https.HTTP_METHOD.POST)

export const friendDelete = async (userId, friendId) => await api(apis.FRIEND.FRIEND_DELETE(userId, friendId), https.HTTP_METHOD.DELETE)

export const inviationGet = async (userId, length) => await api(apis.FRIEND.INVITATION_GET(userId, length), https.HTTP_METHOD.GET)

export const invitationPost = async (userId, strangerId) => await api(apis.FRIEND.INVITATION_POST(userId, strangerId), https.HTTP_METHOD.POST)

export const invitationDelete = async (userId, strangerId) => await api(apis.FRIEND.INVITATION_DELETE(userId, strangerId), https.HTTP_METHOD.DELETE)

export const suggestion = async (userId, length) => await api(apis.FRIEND.SUGGESTION(userId, length), https.HTTP_METHOD.GET)