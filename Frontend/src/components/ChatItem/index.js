import clsx from 'clsx';
import { useEffect, useState } from 'react'
//
import { helper } from './../../utils';
import { useChatStore, ChatActions } from './../../stores/chat';
import { room as roomApi } from './../../apis'
import { cookie } from './../../utils'
import { https, cookies, messages } from './../../constants'
import styles from './ChatItem.module.css';

function ChatItem({roomId}) {
    const [roomInfo, setRoomInfo] = useState({})
    const [{activeRoom}, dispatch] = useChatStore()
    useEffect(() => {
        getRoomInfo()
    }, []);

    const getRoomInfo = async () => {
        const cookieObj = cookie.cookieToObject()
        const response = await roomApi.get(cookieObj[cookies.USER_ID], roomId)
        if(response.status === https.STATUS_CODE.OK)
            response.json().then(data => setRoomInfo(data))
    }

    const handleOnClick = () => {
        dispatch(ChatActions.setActiveRoom(roomId))
    }

    return (
        <div className={clsx('cursor-pointer', styles.container, { [styles.active]: roomId === activeRoom })}>
            {/* {console.log('ChatItem re-render')} */}
            <div onClick={handleOnClick} className={clsx('d-flex', 'w-100', styles.wrapper)}>
                <div className={styles.avatar}></div>
                <div className={clsx(styles.infoContainer, 'd-flex', 'flex-col')}>
                    <div className={clsx('d-flex', styles.infoTopContainer)}>
                        <span className={clsx('text-body-1', styles.name)}>{roomInfo && roomInfo.Name}</span>
                        <span className={clsx('text-body-4', styles.sentTime)}>{roomInfo && roomInfo.LastMessage && helper.distanceTime(roomInfo.LastMessage[messages.TIME_CREATED])}</span>
                    </div>
                    <div className={styles.infoBottomContainer}>
                        <span className={clsx('text-body-4', styles.lastMessage)}>{roomInfo && roomInfo.LastMessage && roomInfo.LastMessage.Content}</span>
                        {/* <span></span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatItem;