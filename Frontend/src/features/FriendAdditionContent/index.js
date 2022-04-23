import { useRef, useState, useEffect, useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
//
import { cookie, helper } from '../../utils'
import { friend } from '../../apis'
import { https, cookies, routes } from '../../constants'
import { Search, FriendAdditionContainer } from '../../components';
import styles from './FriendAdditionContent.module.css';

function FriendAdditionContent() {
    const navigate = useNavigate()
    const containerRef = useRef();
    const lastScrollTopRef = useRef(0)
    const scrollContainerRef = useRef()
    const [triggerApi, setTriggerApi] = useState(false)
    const [strangerIds, setStrangerIds] = useState([])
    const scrollListener = useCallback((e) => helper.triggerBottomed(e, lastScrollTopRef, () => setTriggerApi(prev => !prev)),[])
    useEffect(() => {
        const callback = async () => {
            const cookieObj = cookie.cookieToObject()
            const response = await friend.suggestion(cookieObj[cookies.USER_ID], strangerIds.length)
            if (!response) return
            if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                navigate(routes.ROUTES.LOGIN)
            else if (response.status === https.STATUS_CODE.OK) {
                await response.clone().json().then(data => setStrangerIds(prev => [...prev, ...data]))
            }
        }
        callback()
    }, [triggerApi])
    useEffect(() => helper.useEffectBindEvent(scrollContainerRef, 'scroll', scrollListener), [])
    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.searchContainer}>
                <Search placeholder='Tìm kiếm với tên đầy đủ, tên tài khoản hoặc email' />
            </div>
            <div ref={scrollContainerRef} className={styles.friendsContainer}>
                <div className={styles.friendsWrapper}>
                    {
                        strangerIds.map((strangerId, index) => {
                            return (
                                <FriendAdditionContainer key={index} strangerId={strangerId} containerRef={containerRef}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FriendAdditionContent
