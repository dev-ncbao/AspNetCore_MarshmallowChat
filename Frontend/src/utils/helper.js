const floorTouch = (e, lastScrollRef, callback) => {
    if (lastScrollRef.current >= 0) {
        const { scrollTop, offsetHeight, scrollHeight } = e.target
        const scroll = scrollHeight - scrollTop
        const scrollFloor = Math.floor(scroll)
        if (Math.floor(Math.abs(offsetHeight - scroll)) === 0 && scrollFloor < lastScrollRef.current) {
            lastScrollRef.current = 0
            callback()
        }
        else lastScrollRef.current = scrollFloor

    }
}

const ceilingTouch = (e, lastScrollRef, callback) => {
    if (lastScrollRef.current >= -1) {
        const { scrollTop } = e.target
        const scroll = Math.ceil(scrollTop)
        if (scroll === 0 && scroll < lastScrollRef.current) {
            callback()
        }
        else lastScrollRef.current = scroll
    }
}

const useEffectBindEvent = (elementRef, type, callback, option = false) => {
    if (elementRef.current)
        elementRef.current.addEventListener(type, callback, option)
    return () => {
        if (elementRef.current)
            elementRef.current.removeEventListener(type, callback, option)
    }
}

const combinePath = (...routes) => {
    return '/' + routes.reduce((prev, cur) => `${prev}/${cur}`)
}

const distanceTime = (time) => {
    const aMinute = 60;
    const anHour = 60 * aMinute;
    const aDay = 24 * anHour;
    const last = new Date(time)
    const now = new Date()
    const distance = Math.round((now - last) / 1000, 0);
    if (distance < aMinute) return `${Math.round(distance, 0)} giây`
    else if (distance < anHour) return `${Math.round(distance / aMinute)} phút`
    else if (distance < aDay) return `${Math.round(distance / anHour)} giờ`
    else return `${Math.round(distance / aDay)} ngày`
}

export {
    floorTouch,
    ceilingTouch,
    combinePath,
    distanceTime,
    useEffectBindEvent
}