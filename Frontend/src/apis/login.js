import api from './../apis'
import { apis, https } from './../constants'

export const test = async (body) => await api('/login/test/0', https.HTTP_METHOD.POST, body)

export const check = async () => await api(apis.LOGIN.CHECK, https.HTTP_METHOD.GET)

export const post = async (body) => await api(apis.LOGIN.LOGIN, https.HTTP_METHOD.POST, body)
