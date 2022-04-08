import { useRef, useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
//
import { cookie } from '../../utils'
import { friend } from '../../apis'
import { https, cookies, routes } from '../../constants'
import { Search, FriendAdditionContainer } from '../../components';
import styles from './FriendAdditionContent.module.css';

function FriendAdditionContent() {
    const navigate = useNavigate()
    const containerRef = useRef();
    const [strangerIds, setStrangerIds] = useState([])
    useEffect(() => {
        const callback = async () => {
            const cookieObj = cookie.cookieToObject()
            const response = await friend.inviation(cookieObj[cookies.USER_ID], strangerIds.length)
            if (!response) return
            if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                navigate(routes.ROUTES.LOGIN)
            else if (response.status === https.STATUS_CODE.OK) {
                await response.clone().json().then(data => setStrangerIds(prev => [...prev, ...data]))
            }
        }
        callback()
    }, [])
    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.searchContainer}>
                <Search placeholder='Tìm kiếm bạn bè' />
            </div>
            <div className={styles.friendsContainer}>
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