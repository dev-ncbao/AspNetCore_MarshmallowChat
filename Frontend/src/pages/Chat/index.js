import { Outlet } from 'react-router-dom'
//
import { Layout } from "../../containers";
import { RoomPanel } from './../../features';

function Chat() {
    return (
        <Layout>
            <RoomPanel/>
            <Outlet />
        </Layout>
    )
}

export default Chat
