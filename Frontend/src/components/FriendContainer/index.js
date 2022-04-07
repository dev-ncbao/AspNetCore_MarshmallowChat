import { faEllipsis, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx'
import { useState, useRef, useLayoutEffect } from 'react';
//
import { ContextMenuItem, ContactCard } from './../../components'
import { ContextMenu } from './../../features';
import styles from './FriendContainer.module.css'

function FriendContrainer({ friend, containerRef }) {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [contextOverflow, setContextOverflow] = useState(false);
    const contextContainerRef = useRef();
    const contextMenuItems = [
        {
            name: 'Xóa kết bạn',
            icon: <FontAwesomeIcon icon={faUserMinus} />,
            description: '',
            onClick: null
        }
    ]
    useLayoutEffect(() => {
        if (toggleMenu && containerRef.current && contextContainerRef.current) {
            const container = containerRef.current.getBoundingClientRect()
            const contextContainer = contextContainerRef.current.getBoundingClientRect()
            if(container.right < contextContainer.right && contextOverflow === false) setContextOverflow(true)
            else if(contextContainer.left < container.left && contextOverflow === true) setContextOverflow(false)
        } 
    }, [toggleMenu])
    const handleToggleMenu = () => {
        setToggleMenu(prev => !prev);
    }
    const handleGoToChat = () => {

    }

    return (
        <ContactCard>
            <div className={styles.avatar}></div>
            <div className={styles.infoContainer}>
                <span className={clsx(styles.name, 'text-headline-3')}>{friend.name}</span>
                <span className={clsx(styles.description, 'text-body-2')}>{friend.description}</span>
            </div>
            <div id='context' className={styles.buttonContainer}>
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
            </div>
        </ContactCard>
    )
}

export default FriendContrainer
