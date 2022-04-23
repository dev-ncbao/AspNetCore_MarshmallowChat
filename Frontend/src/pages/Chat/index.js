import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBell, faChevronDown, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
//
import { room } from './../../apis'
import { cookies, https } from './../../constants'
import { cookie } from './../../utils'
import { Layout, LayoutLeft, LayoutCenter, LayoutRight } from "../../containers";
import { ChatPanel } from './../../features'
import { Search, ChatItem, ChatSettingItem, NavRounded } from './../../components';
import { rooms as roomsCst, routes } from './../../constants'
import styles from './Chat.module.css';
import { faImages } from "@fortawesome/free-regular-svg-icons";

const settingItems = [
    {
        name: 'Tùy chỉnh giao diện đoạn chat',
        icon: faChevronDown
    },
    {
        name: 'Tập tin và liên kết',
        icon: faChevronDown
    },
    {
        name: 'Thành viên trong đoạn chat',
        icon: faChevronDown
    },
    {
        name: 'Thiết lập',
        icon: faChevronDown
    }
]

function Chat() {
    const navigate = useNavigate()
    const {id} = useParams()
    const idParam = parseInt(id)
    const [roomIds, setRoomIds] = useState([])
    
    const handleChangeRoom = (roomId) => {
        navigate(routes.ROUTES.CHAT(roomId))
    }

    useEffect(() => {
        const callback = async () => {
            const cookieObj = cookie.cookieToObject()
            const response = await room.get_list(cookieObj[cookies.USER_ID], JSON.stringify(roomIds))
            if(response.status === https.STATUS_CODE.UNAUTHORIZED) navigate(routes.ROUTES.LOGIN)
            else if( response.status === https.STATUS_CODE.OK){
                await response.json().then(data => {
                    setRoomIds(prev => [...prev, ...data])
                })
            }
        }
        callback()
    },[])

    return (
        <Layout>
            <LayoutLeft>
                <div className={clsx('d-flex', 'flex-col', styles.leftContainer)}>
                    <div className={styles.searchContainer}>
                        <Search placeholder='Tìm kiếm đoạn chat' />
                    </div>
                    <div className={styles.chatsContainer}>
                        {
                            roomIds.map((roomId) => (
                                <ChatItem key={roomId} active={roomId === idParam} roomId={roomId} onClick={handleChangeRoom}/>
                            ))
                        }
                    </div>
                </div>
            </LayoutLeft>
            <LayoutCenter>
                <ChatPanel roomId={idParam}/>
            </LayoutCenter>
            <LayoutRight>
                <div className={clsx(styles.rightContainer, 'd-flex', 'flex-col')}>
                    <div className={clsx(styles.settingTitleContainer, 'd-flex', 'align-center')}>
                        <span className={clsx(styles.settingTitle, 'text-headline-3')}>Thông tin và thiết lập</span>
                    </div>
                    <div className={styles.settingContainer}>

                        <ChatSettingItem
                            itemName={'Tùy chỉnh giao diện đoạn chat'}
                            icon={faChevronDown}
                        >
                            <div className={clsx(styles.subItemWrapper, 'd-flex', 'align-center', 'cursor-pointer')}>
                                <FontAwesomeIcon icon={faPencil} className={styles.subSettingIcon} />
                                <span className={clsx(styles.itemName, 'text-body-1')}>Đổi tên đoạn chat</span>
                            </div>
                            <div className={clsx(styles.subItemWrapper, 'd-flex', 'align-center', 'cursor-pointer')}>
                                <FontAwesomeIcon icon={faImages} className={styles.subSettingIcon} />
                                <span className={clsx(styles.itemName, 'text-body-1')}>Đổi ảnh đoạn chat</span>
                            </div>
                        </ChatSettingItem>
                        <ChatSettingItem
                            itemName={'Tập tin và liên kết'}
                            icon={faChevronDown}
                        >
                            <div className={clsx(styles.subItemWrapper, styles.fileAndLinkWrapper, 'd-flex', 'align-center', 'cursor-pointer', 'flex-col')}>
                                <div className={styles.subNavContainer}>
                                    <NavRounded
                                        items={['File phương tiện', 'File', 'Liên kết']}
                                    />
                                </div>
                                <div className={styles.pictureContainer}>
                                    <div className={styles.pictureWrapper}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </ChatSettingItem>
                        <ChatSettingItem
                            itemName={'Thành viên trong đoạn chat'}
                            icon={faChevronDown}
                        >
                            <div className={clsx(styles.subItemWrapper, 'd-flex', 'align-center', 'cursor-pointer')}>
                                <div className={styles.memberAvatar}></div>
                                <div className={styles.memberInfo}>
                                    <span className={clsx(styles.memberName, 'text-body-2')}>Nguyễn Chí Bảo</span>
                                    <span className={clsx(styles.memberAddedBy, 'text-body-4')}>Thêm bởi Nguyễn Chí Bảo</span>
                                </div>
                            </div>
                            <div className={clsx(styles.subItemWrapper, 'd-flex', 'align-center', 'cursor-pointer')}>
                                <div className={styles.memberAvatar}></div>
                                <div className={styles.memberInfo}>
                                    <span className={clsx(styles.memberName, 'text-body-2')}>Nguyễn Chí Bảo</span>
                                    <span className={clsx(styles.memberAddedBy, 'text-body-4')}>Thêm bởi Nguyễn Chí Bảo</span>
                                </div>
                            </div>
                        </ChatSettingItem>
                        <ChatSettingItem
                            itemName={'Thiết lập'}
                            icon={faChevronDown}
                        >
                            <div className={clsx(styles.subItemWrapper, 'd-flex', 'align-center', 'cursor-pointer')}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.subSettingIcon} />
                                <span className={clsx(styles.itemName, 'text-body-1')}>Rời khỏi nhóm</span>
                            </div>
                            <div className={clsx(styles.subItemWrapper, 'd-flex', 'align-center', 'cursor-pointer')}>
                                <FontAwesomeIcon icon={faBell} className={styles.subSettingIcon} />
                                <span className={clsx(styles.itemName, 'text-body-1')}>Tắt thông báo</span>
                            </div>
                        </ChatSettingItem>

                    </div>
                </div>
            </LayoutRight>
        </Layout>
    )
}

export default Chat
