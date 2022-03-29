export const cookieToObject = () => {
    if(document.cookie.length === 0) return null;
    const obj = {};
    const cookies = document.cookie.trim();
    const cookieArray = cookies.split(';');
    cookieArray.forEach((val) => {
        const cookie = val.trim().split('=');
        obj[cookie[0]] = cookie[1];
    });
    return obj;
}

export const checkCookieExpire = () => {
    const expireTime = localStorage.getItem('expireTime');
    return expireTime ? new Date(expireTime) < new Date() : null;
}