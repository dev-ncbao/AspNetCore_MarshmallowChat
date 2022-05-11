import { faCircleUser, faEllipsis, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx'
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
//
import { cookie } from './../../utils'
import { https, routes, cookies, users } from './../../constants'
import { user, friend as friendApi, room } from './../../apis'
import { ContextMenuItem, ContactCard } from './../../components'
import { ContextMenu } from './../../features';
import styles from './FriendContainer.module.css'

function FriendContainer({ friendId, containerRef }) {
    const navigate = useNavigate()
    const [friend, setFriend] = useState({})
    const [isDelete, setIsDelete] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false);
    const [contextOverflow, setContextOverflow] = useState(false);
    const contextContainerRef = useRef();
    const contextMenuItems = [
        {
            name: 'Trang cá nhân',
            icon: <FontAwesomeIcon icon={faCircleUser} />,
            description: '',
            onClick: null
        },
        {
            name: 'Hủy kết bạn',
            icon: <FontAwesomeIcon icon={faUserMinus} />,
            description: 'Xóa người này ra khỏi danh sách bạn bè của bạn',
            onClick: async () => {
                const cookieObj = cookie.cookieToObject()
                const response = await friendApi.friendDelete(cookieObj[cookies.USER_ID], friend[users.USER_ID])
                if (!response) return
                if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                    navigate(routes.ROUTES.LOGIN)
                else if (response.status === https.STATUS_CODE.OK)
                    setIsDelete(() => true)
            }
        }
    ]
    useEffect(() => {
        const callback = async () => {
            const response = await user.get(friendId)
            if (!response) return
            if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                navigate(routes.ROUTES.LOGIN)
            else if (response.status === https.STATUS_CODE.OK) {
                await response.clone().json().then(data => setFriend(() => data))
            }
        }
        callback()
    }, [])
    useLayoutEffect(() => {
        if (toggleMenu && containerRef.current && contextContainerRef.current) {
            const container = containerRef.current.getBoundingClientRect()
            const contextContainer = contextContainerRef.current.getBoundingClientRect()
            if (container.right < contextContainer.right && contextOverflow === false) setContextOverflow(true)
            else if (contextContainer.left < container.left && contextOverflow === true) setContextOverflow(false)
        }
    }, [toggleMenu])
    const handleToggleMenu = () => {
        setToggleMenu(prev => !prev);
    }
    const handleGoToChat = async () => {
        const cookieObj = cookie.cookieToObject()
        const response = await room.get_find(cookieObj[cookies.USER_ID], friend[users.USER_ID])
        if (response.status === https.STATUS_CODE.UNAUTHORIZED)
            navigate(routes.ROUTES.LOGIN)
        else if (response.status === https.STATUS_CODE.OK) {
            await response.clone().json().then(data => navigate(routes.ROUTES.CHAT(data)))
        }
    }

    return (
        <ContactCard>
            <div className={styles.avatar}></div>
            <div className={styles.infoContainer}>
                <span className={clsx(styles.name, 'text-headline-3')}>{`${friend.FirstName} ${friend.LastName}`}</span>
                <span className={clsx(styles.description, 'text-body-2')}>{friend.Username}</span>
            </div>
            <div id='context' className={styles.buttonContainer}>
                {
                    isDelete
                    && (
                        <span>Đã hủy kết bạn</span>
                    )
                    || (
                        <>
                            <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonLeft)} onClick={handleGoToChat}>Nhắn tin</button>
                            <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonRight)} onClick={handleToggleMenu}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </button>
                            {toggleMenu && (
                                <div ref={contextContainerRef} className={clsx(styles.contextMenuContainer, contextOverflow ? styles.leftSide : styles.rightSide)}>
                                    <ContextMenu backdropOnClick={handleToggleMenu}>
                                        {
                                            contextMenuItems.map((item, index) => {
                                                return (
                                                    <ContextMenuItem key={index} name={item.name} icon={item.icon} description={item.description} onClick={item.onClick} />
                                                )
                                            })
                                        }
                                    </ContextMenu>
                                </div>
                            )}
                        </>
                    )
                }
            </div>
        </ContactCard>
    )
}

export default FriendContainer
