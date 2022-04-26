import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
//
import { cookie, helper } from './../../utils'
import { friend } from './../../apis'
import { https, cookies, routes } from './../../constants'
import { Search, FriendContainer } from './../../components';
import styles from './FriendListContent.module.css';

function FriendListContent() {
    const navigate = useNavigate()
    const containerRef = useRef();
    const scrollContainerRef = useRef()
    const lastScrollTopRef = useRef(0)
    const [triggerApi, setTriggerApi] = useState(false)
    const [friendIds, setFriendIds] = useState([])
    const scrollListener = useCallback((e) => helper.floorTouch(e, lastScrollTopRef, () => setTriggerApi(prev => !prev)), [])
    useEffect(() => {
        const callback = async () => {
            const cookieObj = cookie.cookieToObject()
            const response = await friend.friendGet(cookieObj[cookies.USER_ID], friendIds.length)
            if (!response) return
            if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                navigate(routes.ROUTES.LOGIN)
            else if (response.status === https.STATUS_CODE.OK) {
                await response.clone().json().then(data => setFriendIds(prev => [...prev, ...data]))
            }
        }
        callback()
    }, [triggerApi])
    useEffect(() => helper.useEffectBindEvent(scrollContainerRef, 'scroll', scrollListener), [])
    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.searchContainer}>
                <Search placeholder='Tìm kiếm trong danh sách bạn bè' />
            </div>
            <div ref={scrollContainerRef} className={styles.friendsContainer}>
                <div className={styles.friendsWrapper}>
                    {
                        friendIds.map((friendId, index) => {
                            return (
                                <FriendContainer key={index} friendId={friendId} containerRef={containerRef} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FriendListContent
