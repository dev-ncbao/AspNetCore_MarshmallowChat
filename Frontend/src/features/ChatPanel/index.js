import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faPaperclip, faFaceSmile, faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//
import { message as messageApi } from './../../apis'
import { https, cookies, message, routes } from './../../constants'
import { cookie } from './../../utils'
import { YourMessage, OtherMessage } from './../../components'
import styles from './ChatPanel.module.css'

function ChatPanel({ roomId }) {

    const [messages, setMessages] = useState([]);
    const [roomMem, setRoomMem] = useState([]);
    const cookieObj = cookie.cookieToObject()
    const navigate = useNavigate()
    useEffect(() => {
        const callback = async () => {
            const response = await messageApi.get(cookieObj[cookies.USER_ID], roomId, messages.length)
            if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                navigate(routes.ROUTES.LOGIN)
            else if (response.status === https.STATUS_CODE.OK)
                await response.json().then(data => {
                    setMessages(prev => [...prev, ...data])
                })

            
        }
        callback()
    }, [])

    const sendMessage = (message) => {

    }

    const handlePressEnter = (e) => {
        if (e.which === 13) {
            sendMessage(e.target.innerText);
        }
    }

    return (
        <div className={clsx('d-flex', 'flex-col', styles.centerContainer)}>
            <div className={styles.infoContainer}>
                <div className={clsx(styles.infoWrapper, 'd-flex', 'align-center')}>
                    <div className={clsx(styles.chatInfo, 'd-flex')}>
                        <div className={styles.avatar}></div>
                        <div className={clsx('d-flex', 'flex-col')}>
                            <span className={clsx('text-headline-3', styles.name)}>Nguyễn Chí A</span>
                            <span className={clsx('text-body-4', styles.accessState)}>Đang hoạt động</span>
                        </div>
                    </div>
                    <div className={clsx(styles.menuContainer, 'd-flex')}>
                        <button className={clsx('cursor-pointer', 'clear-button-tag', styles.btnDetailInfo)}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.messagesContainer)}>
                <div className={clsx(styles.messagesWrapper, 'd-flex', 'flex-col')}>
                    {
                        messages.map(mess => (
                            mess[message.USER_ID] === cookieObj[cookies.USER_ID]
                            ? 
                            <YourMessage messageContent={mess[message.CONTENT]}/>
                            :
                            <OtherMessage senderName={} messageContent={mess[message.CONTENT]}/>
                        ))
                    }
                </div>
            </div>
            <div className={styles.inputContainer}>
                <div className={clsx(styles.inputWrapper, 'd-flex')}>
                    <button className={clsx('cursor-pointer', 'clear-button-tag', styles.btnDetachFiles)}>
                        <FontAwesomeIcon icon={faPaperclip} />
                    </button>
                    <button className={clsx('cursor-pointer', 'clear-button-tag', styles.btnUploadImages)}>
                        <FontAwesomeIcon icon={faImage} />
                    </button>
                    <div className={clsx(styles.inputMessageContainer, 'd-flex', 'align-center')}>
                        <div className={styles.inputMessageWrapper}>
                            <div
                                suppressContentEditableWarning={true}
                                contentEditable={true}
                                className={clsx(styles.inputMessage, styles.inputMessagePlaceholder, 'text-body-2')}
                                placeholder='Nhập tin nhắn của bạn vào đây'
                                id="input-message"
                                onKeyPress={handlePressEnter}
                            >Nhập tin nhắn của bạn vào đây</div>
                        </div>
                    </div>
                    <button className={clsx('cursor-pointer', 'clear-button-tag', styles.btnAddEmoji)}>
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </button>
                    <button className={clsx('cursor-pointer', 'clear-button-tag', styles.btnSendMessage)}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatPanel
