const cookieToObject = () => {
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

export { cookieToObject }