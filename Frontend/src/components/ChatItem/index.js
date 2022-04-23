import clsx from 'clsx';
import { useEffect, useState } from 'react'
//
import { room as roomApi } from './../../apis'
import { cookie } from './../../utils'
import { https, cookies } from './../../constants'
import styles from './ChatItem.module.css';

function ChatItem({ active, roomId, onClick }) {
    const [room, setRoom] = useState({})

    useEffect(() => {
        const callback = async () => {
            const cookieObj = cookie.cookieToObject()
            const response = await roomApi.get(cookieObj[cookies.USER_ID], roomId)
            if(response.status === https.STATUS_CODE.OK)
                response.json().then(data => setRoom(data))
        }
        callback()
    }, []);

    const handleOnClick = () => {
        onClick(roomId)
    }

    return (
        <div className={clsx('cursor-pointer', styles.container, { [styles.active]: active })}>
            <div onClick={handleOnClick} className={clsx('d-flex', 'w-100', styles.wrapper)}>
                <div className={styles.avatar}></div>
                <div className={clsx(styles.infoContainer, 'd-flex', 'flex-col')}>
                    <div className={clsx('d-flex', styles.infoTopContainer)}>
                        <span className={clsx('text-body-1', styles.name)}>{room ? room.Name : ''}</span>
                        <span className={clsx('text-body-4', styles.sentTime)}>1 phút</span>
                    </div>
                    <div className={styles.infoBottomContainer}>
                        <span className={clsx('text-body-4', styles.lastMessage)}>{room && room.LastMessage ? room.LastMessage.Content : ''}</span>
                        {/* <span></span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatItem;