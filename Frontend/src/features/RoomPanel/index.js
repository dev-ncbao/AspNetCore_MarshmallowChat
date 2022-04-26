import clsx from "clsx";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom'
//
import { useChatStore } from './../../stores/chat'
import { ChatActions } from './../../stores/chat'
import { room as roomApi } from './../../apis'
import { cookies, https } from './../../constants'
import { cookie, helper } from './../../utils'
import { routes } from './../../constants'
import { LayoutLeft } from "../../containers";
import { Search, ChatItem } from './../../components';
import styles from './RoomPanel.module.css'

function RoomPanel() {
    const [{ rooms, activeRoom }, dispatch] = useChatStore()
    const navigate = useNavigate()
    const { id } = useParams()
    const containerRef = useRef()
    const lastScrollRef = useRef(0)
    const [triggerApi, setTriggerApi] = useState(false)
    const cookieObj = cookie.cookieToObject()

    const scrollListener = useCallback((e) => helper.floorTouch(e, lastScrollRef, () => setTriggerApi(prev => !prev)), [])

    
    useEffect(() => {
        if (id && activeRoom === 0) dispatch(ChatActions.setActiveRoom(parseInt(id)))
        if (activeRoom !== 0 && ( id === undefined || parseInt(id) !== activeRoom)) navigate(routes.ROUTES.CHAT(activeRoom))
    }, [id, activeRoom])
    
    useEffect(() => {
        getRooms()
    }, [triggerApi])

    useEffect(() => helper.useEffectBindEvent(containerRef, 'scroll', scrollListener), [])

    const getRooms = async () => {
        const response = await roomApi.get_list(cookieObj[cookies.USER_ID], JSON.stringify(rooms))
        if (response.status === https.STATUS_CODE.UNAUTHORIZED) navigate(routes.ROUTES.LOGIN)
        else if (response.status === https.STATUS_CODE.OK) {
            await response.json().then(data => {
                dispatch(ChatActions.setRooms(data))
            })
        }
    }

    return (
        <LayoutLeft>
            {/* {console.log('RoomPanel re-render')} */}
            <div className={clsx('d-flex', 'flex-col', styles.leftContainer)}>
                <div className={styles.searchContainer}>
                    <Search placeholder='Tìm kiếm đoạn chat' />
                </div>
                <div ref={containerRef} className={styles.chatsContainer}>
                    {
                        rooms.map((r) => (
                            <ChatItem key={r} roomId={r} />
                        ))
                    }
                </div>
            </div>
        </LayoutLeft>
    )
}

export default RoomPanel
