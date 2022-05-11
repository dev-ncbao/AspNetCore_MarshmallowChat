import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faPaperclip, faFaceSmile, faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
//
import { useStore as useChatStore, actions as chatActions } from './../../stores/chat'
import { message as messageApi } from './../../apis'
import { https, cookies, messages as messagesCst, routes } from './../../constants'
import { cookie, helper } from './../../utils'
import { YourMessage, OtherMessage } from './../../components'
import { LayoutCenter } from './../../containers'
import { ChatSetting } from './../../features'
import { useStore as useIOStore } from './../../stores/io'
import styles from './ChatPanel.module.css'

function ChatPanel() {
    const [{ socketSession }] = useIOStore()
    const [triggerApi, setTriggerApi] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)
    const [toggleSetting, setToggleSetting] = useState(false)
    const [{ messages, rooms, activeRoom }, dispatch] = useChatStore()
    const room = rooms.find(r => r.RoomId === activeRoom)
    const cookieObj = cookie.cookieToObject()
    const navigate = useNavigate()
    const containerRef = useRef()
    const lastScrollRef = useRef(-1)
    const inputRef = useRef()
    const listenScroll = useCallback((e) => helper.ceilingTouch(e, lastScrollRef, () => setTriggerApi(prev => !prev)), [])

    useEffect(() => helper.useEffectBindEvent(containerRef, 'scroll', listenScroll), [])

    /*     useEffect(() => {
            if (activeRoom !== 0) {
                getMembers()
                getRoomInfo()
            }
        }, [activeRoom]) */

    useEffect(() => {
        if (activeRoom !== 0)
            getMessages()
    }, [triggerApi, activeRoom])

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
    }, [messages])

    const getMessages = async () => {
        const response = await messageApi.get(cookieObj[cookies.USER_ID], activeRoom, messages.length)
        if (response.status === https.STATUS_CODE.UNAUTHORIZED)
            navigate(routes.ROUTES.LOGIN)
        else if (response.status === https.STATUS_CODE.OK)
            await response.json().then(data => {
                if (data.length > 0) dispatch(chatActions.addOldMessage([...data, ...messages]))
            })
    }

    /* const getRoomInfo = async () => {
        const cookieObj = cookie.cookieToObject()
        const response = await roomApi.get(cookieObj[cookies.USER_ID], activeRoom)
        if (response.status === https.STATUS_CODE.OK)
            response.json().then(data => {
                dispatch(chatActions.setRoomInfo(data))
            })
    }

    const getMembers = async () => {
        const response = await roomApi.get_members(cookieObj[cookies.USER_ID], activeRoom)
        if (response.status === https.STATUS_CODE.UNAUTHORIZED) navigate(routes.ROUTES.LOGIN)
        else if (response.status === https.STATUS_CODE.OK) {
            await response.json().then(data => {
                dispatch(chatActions.setMembers(data))
            })
        }
    } */

    const handleSendMessage = (messageContent) => {
        const message = {
            MessageId: null,
            RoomId: room.RoomId,
            Content: messageContent,
            Type: 0,
            DateCreated: new Date().getTime(),
            UserId: parseInt(cookieObj[cookies.USER_ID])
        }
        socketSession.socket.emit('chat:receive', message)
        //dispatch(chatActions.setMessages([...messages, message]))
    }

    const handleClickSend = () => {
        const messageContent = inputRef.current.innerText;
        if (messageContent !== '' && inputFocus === true) {
            handleSendMessage(messageContent)
            inputRef.current.innerText = 'Nhập tin nhắn của bạn vào đây'
            setInputFocus(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.which === 13 && e.shiftKey === false) {
            e.preventDefault()
            if (e.target.innerText !== '') {
                handleSendMessage(e.target.innerText)
                e.target.innerText = ''
            }
        }
    }

    const getSender = (senderId) => {
        if (room && room.Members)
            return room.Members.find((member) => member.UserId === senderId)
    }

    const handleFocus = (e) => {
        if (e.target.innerText === 'Nhập tin nhắn của bạn vào đây') {
            e.target.innerText = ''
            setInputFocus(true)
        }
    }

    const handleBlur = (e) => {
        if (e.target.innerText === '') {
            e.target.innerText = 'Nhập tin nhắn của bạn vào đây'
            setInputFocus(false)
        }
    }

    const handleToggleSetting = () => setToggleSetting(!toggleSetting)

    return (
        <>
            {/* {console.log('ChatPanel re-render')} */}
            <LayoutCenter>
                <div className={clsx('d-flex', 'flex-col', styles.centerContainer)}>
                    <div className={styles.infoContainer}>
                        <div className={clsx(styles.infoWrapper, 'd-flex', 'align-center')}>
                            <div className={clsx(styles.chatInfo, 'd-flex')}>
                                <div className={styles.avatar}></div>
                                <div className={clsx('d-flex', 'flex-col')}>
                                    <span className={clsx('text-headline-3', styles.name)}>{room && room.Name}</span>
                                    <span className={clsx('text-body-4', styles.accessState)}>Đang hoạt động</span>
                                </div>
                            </div>
                            <div className={clsx(styles.menuContainer, 'd-flex')}>
                                <button onClick={handleToggleSetting} className={clsx('cursor-pointer', 'clear-button-tag', styles.btnDetailInfo)}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref={containerRef} className={clsx(styles.messagesContainer)}>
                        <div className={clsx(styles.messagesWrapper, 'd-flex', 'flex-col')}>
                            {
                                messages.map((message, index) => {
                                    return (
                                        message[messagesCst.USER_ID] === parseInt(cookieObj[cookies.USER_ID])
                                            ?
                                            <YourMessage key={index} /* key={message[messagesCst.MESSAGE_ID]} */ messageContent={message[messagesCst.CONTENT]} />
                                            :
                                            <OtherMessage key={index} /* key={message[messagesCst.MESSAGE_ID]} */ sender={getSender(message[messagesCst.USER_ID])} messageContent={message[messagesCst.CONTENT]} />
                                    )
                                })
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
                                        className={clsx({
                                            [styles.inputMessagePlaceholder]: !inputFocus
                                        }, styles.inputMessage, 'text-body-2')}
                                        /* id="input-message" */
                                        ref={inputRef}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        onKeyPress={handleKeyPress}
                                    >Nhập tin nhắn của bạn vào đây</div>
                                </div>
                            </div>
                            <button className={clsx('cursor-pointer', 'clear-button-tag', styles.btnAddEmoji)}>
                                <FontAwesomeIcon icon={faFaceSmile} />
                            </button>
                            <button onClick={handleClickSend} className={clsx('cursor-pointer', 'clear-button-tag', styles.btnSendMessage)}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                </div>
            </LayoutCenter>
            {toggleSetting && <ChatSetting />}
        </>
    )
}

export default ChatPanel
