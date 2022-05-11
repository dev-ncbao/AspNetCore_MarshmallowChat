import clsx from 'clsx';
//
import { helper, cookie } from './../../utils';
import { useStore as useChatStore, actions as chatActions } from './../../stores/chat';
import { cookies, messages } from './../../constants'
import styles from './ChatItem.module.css';

function ChatItem({ room }) {
    const [{ activeRoom }, dispatch] = useChatStore()
    const handleOnClick = () => {
        dispatch(chatActions.updateActiveRoom(room.RoomId))
    }

    const showLastMessage = () => {
        if (room && room.LastMessage) {
            const cookieObj = cookie.cookieToObject()
            if (room.LastMessage[messages.USER_ID] === Number.parseInt(cookieObj[cookies.USER_ID]))
                return `Bạn: ${room.LastMessage.Content}`
            else if (room.Type === 0)
                return room.LastMessage.Content
            else {
                const sender = room.Members.find(mem => mem.UserId === room.LastMessage[messages.USER_ID])
                console.log(`${sender.FirstName} ${sender.LastName}: ${room.LastMessage.Content}`)
                return `${sender.FirstName} ${sender.LastName}: ${room.LastMessage.Content}`
            }
        }
    }

    return (
        <div className={clsx('cursor-pointer', styles.container, { [styles.active]: room.RoomId === activeRoom })}>
            {/* {console.log('ChatItem re-render')} */}
            <div onClick={handleOnClick} className={clsx('d-flex', 'w-100', styles.wrapper)}>
                <div className={styles.avatar}></div>
                <div className={clsx(styles.infoContainer, 'd-flex', 'flex-col')}>
                    <div className={clsx('d-flex', styles.infoTopContainer)}>
                        <span className={clsx('text-body-1', styles.name)}>{room && room.Name}</span>
                        <span className={clsx('text-body-4', styles.sentTime)}>{room && room.LastMessage && helper.distanceTime(room.LastMessage[messages.DATE_CREATED])}</span>
                    </div>
                    <div className={styles.infoBottomContainer}>
                        <span className={clsx('text-body-4', styles.lastMessage)}>{showLastMessage()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatItem;