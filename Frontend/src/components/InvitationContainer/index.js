import { faCircleUser, faEllipsis, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx'
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
//
import { cookie } from './../../utils'
import { https, routes, cookies, users } from './../../constants'
import { user, friend } from './../../apis'
import { ContextMenuItem, ContactCard } from './../../components'
import { ContextMenu } from './../../features';
import styles from './InvitationContainer.module.css'

function InvitationContainer({ inviterId, containerRef }) {
    const navigate = useNavigate()
    const [inviter, setInviter] = useState({})
    const [isAccept, setIsAccept] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false);
    const [contextOverflow, setContextOverflow] = useState(false);
    const contextContainerRef = useRef();
    const contextMenuItems = [
        {
            name: 'Trang cá nhân',
            icon: <FontAwesomeIcon icon={faCircleUser} />,
            description: '',
            onClick: null
        }
    ]
    useEffect(() => {
        const callback = async () => {
            const response = await user.get(inviterId)
            if (!response) return
            if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                navigate(routes.ROUTES.LOGIN)
            else if (response.status === https.STATUS_CODE.OK) {
                await response.clone().json().then(data => setInviter(() => data))
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
    const handleAccept = async () => {
        const cookieObj = cookie.cookieToObject()
        const response = await friend.friendPost(cookieObj[cookies.USER_ID], inviter[users.USER_ID])
        if (!response) return
        if (response.status === https.STATUS_CODE.UNAUTHORIZED)
            navigate(routes.ROUTES.LOGIN)
        else if(response.status === https.STATUS_CODE.CREATED)
            setIsAccept(() => true)
    }

    return (
        <ContactCard>
            <div className={styles.avatar}></div>
            <div className={styles.infoContainer}>
                <span className={clsx(styles.name, 'text-headline-3')}>{`${inviter.FirstName} ${inviter.LastName}`}</span>
                <span className={clsx(styles.description, 'text-body-2')}>{inviter.Username}</span>
            </div>
            <div id='context' className={styles.buttonContainer}>
                {!isAccept
                    && (
                        <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonLeft)} onClick={handleAccept}>Chấp nhận</button>
                    )
                    || (
                        <span>Đã chấp nhận</span>
                    )}
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
            </div>
        </ContactCard>
    )
}

export default InvitationContainer
