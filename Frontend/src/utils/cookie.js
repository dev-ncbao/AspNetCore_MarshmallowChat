import {storage} from './../constants'

export const cookieToObject = () => {
    if (document.cookie.length === 0) return null
    const obj = {}
    const cookies = document.cookie.trim()
    const arrCookie = cookies.split(';')
    arrCookie.forEach((item) => {
        const cookie = item.trim().split('=')
        obj[cookie[0]] = cookie[1]
    })
    return obj
}

export const checkTokenExpire = () => {
    const expireTime = localStorage.getItem(storage.TOKEN_EXPIRE)
    return expireTime ? new Date(expireTime) < new Date() : null
}

export const setCookie = (cookies, storageItems) => {
    cookies.forEach(cookie => {
        document.cookie = `${cookie.name}=${cookie.value}; expires=${cookie.expires}`
    })
    storageItems.forEach(item => {
        localStorage.setItem(item.name, item.value)
    })
}

export const clearCookie = () => {
    const cookies = cookieToObject()
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1)
    if (cookies) {
        const cookieKeys = Object.keys(cookies)
        cookieKeys.forEach(cookie => {
            document.cookie = `${cookie}=''; expires=${prevDate}`
        })
    }
    localStorage.clear()
}