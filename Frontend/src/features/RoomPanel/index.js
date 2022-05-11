import clsx from "clsx";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom'
//
import { useStore as useChatStore, actions as chatActions } from './../../stores/chat'
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

    const scrollListener = useCallback((e) => helper.floorTouch(e, lastScrollRef, () => setTriggerApi(prev => !prev)), [])


    useEffect(() => {
        if (id && activeRoom === 0) {
            const idParse = Number.parseInt(id)
            const index = rooms.findIndex(room => room.RoomId === idParse)
            if(index === -1) {
                getRoomInfo(idParse)
            }
            dispatch(chatActions.updateActiveRoom(parseInt(id)))
            /* console.log('set active room', activeRoom) */
        }
        if (activeRoom !== 0 && (id === undefined || parseInt(id) !== activeRoom)) {
            navigate(routes.ROUTES.CHAT(activeRoom))
            /* console.log('set active room', activeRoom) */
        }
    }, [id, activeRoom])

    useEffect(() => {
        getRoomsInfo()
    }, [triggerApi])

    useEffect(() => helper.useEffectBindEvent(containerRef, 'scroll', scrollListener), [])

    const getRoomsInfo = async () => {
        const cookieObj = cookie.cookieToObject()
        const response = await roomApi.get_list_info(cookieObj[cookies.USER_ID], JSON.stringify(rooms))
        if(response.status === https.STATUS_CODE.UNAUTHORIZED)
            navigate(routes.ROUTES.LOGIN)
        else if(response.status === https.STATUS_CODE.OK)
            await response.json().then(data => dispatch(chatActions.addRooms(data)))
    }

    const getRoomInfo = async (roomId) => {
        const cookieObj = cookie.cookieToObject()
        const response = await roomApi.get(cookieObj[cookies.USER_ID], roomId)
        if(response.status === https.STATUS_CODE.UNAUTHORIZED)
            navigate(routes.ROUTES.LOGIN)
        else if(response.status === https.STATUS_CODE.OK)
            await response.json().then(data => dispatch(chatActions.addRoom(data)))
    }

    return (
        <LayoutLeft>
            <div className={clsx('d-flex', 'flex-col', styles.leftContainer)}>
                <div className={styles.searchContainer}>
                    <Search placeholder='Tìm kiếm đoạn chat' />
                </div>
                <div ref={containerRef} className={styles.chatsContainer}>
                    {
                        rooms.map((r) => (
                            <ChatItem key={r.RoomId} room={r} />
                        ))
                    }
                </div>
            </div>
        </LayoutLeft>
    )
}

export default RoomPanel
