import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
//
import { cookie, helper } from '../../utils'
import { friend } from '../../apis'
import { https, cookies, routes } from '../../constants'
import { Search, InvitationContainer } from '../../components';
import styles from './FriendInvitationContent.module.css';

function FriendInvitationContent() {
    const navigate = useNavigate()
    const containerRef = useRef();
    const scrollContainerRef = useRef()
    const lastScrollRef = useRef()
    const scrollListener = useCallback((e) => helper.floorTouch(e, lastScrollRef, () => setTriggerApi(prev => !prev), []))
    const [triggerApi, setTriggerApi] = useState(false)
    const [inviterIds, setInviterIds] = useState([])
    useEffect(() => {
        const callback = async () => {
            const cookieObj = cookie.cookieToObject()
            const response = await friend.inviationGet(cookieObj[cookies.USER_ID], inviterIds.length)
            if (!response) return
            if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                navigate(routes.ROUTES.LOGIN)
            else if (response.status === https.STATUS_CODE.OK) {
                await response.clone().json().then(data => setInviterIds(prev => [...prev, ...data]))
            }
        }
        callback()
    }, [triggerApi])
    useEffect(() => helper.useEffectBindEvent(scrollContainerRef, 'scroll', scrollListener), [])
    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.searchContainer}>
                <Search placeholder='Tìm kiếm bạn bè' />
            </div>
            <div className={styles.friendsContainer}>
                <div className={styles.friendsWrapper}>
                    {
                        inviterIds.map((inviterId, index) => {
                            return (
                                <InvitationContainer key={index} inviterId={inviterId} containerRef={containerRef} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FriendInvitationContent
