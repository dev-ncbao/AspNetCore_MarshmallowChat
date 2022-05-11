import { useNavigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
//
import { useStore as useIOStore, actions as ioActions } from './../../stores/io'
import { useStore as useChatStore } from './../../stores/chat'
import Socket from './../../socket'
import { Layout } from "../../containers";
import { RoomPanel } from './../../features';

function Chat() {
    const [{ }, dispatch] = useIOStore()
    const [{ }, chatDispatch] = useChatStore()
    useEffect(() => {
        dispatch(ioActions.setSocketSession(new Socket(chatDispatch)))
    }, [])
    return (
        <Layout>
            <RoomPanel />
            <Outlet />
        </Layout>
    )
}

export default Chat
