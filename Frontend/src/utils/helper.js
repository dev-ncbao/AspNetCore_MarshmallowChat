export const triggerBottomed = (e, lastScrollTopRef, callback) => {
    if (lastScrollTopRef.current >= 0) {
        const { scrollTop, offsetHeight, scrollHeight } = e.target
        const scroll = scrollHeight - scrollTop
        const scrollFloor = Math.floor(scroll)
        if (Math.floor(Math.abs(offsetHeight - scroll)) === 0 && scrollFloor < lastScrollTopRef.current){
            lastScrollTopRef.current = 0
            callback()
        }            
        else lastScrollTopRef.current = scrollFloor
        
    }
}

export const useEffectBindEvent = (elementRef, type, callback, option = false) => {
    if (elementRef.current)
        elementRef.current.addEventListener(type, callback, option)
    return () => {
        if (elementRef.current)
            elementRef.current.removeEventListener(type, callback, option)
    }
}