import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBell, faChevronDown, faCircleInfo, faFaceSmile, faImage, faPaperclip, faPaperPlane, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
//
import { Layout, LayoutLeft, LayoutCenter, LayoutRight } from "../../containers";
import { Search, ChatItem, OtherMessage, YourMessage, ChatSettingItem } from './../../components';
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
    const [messageList, setMessageList] = useState([
        {
            own: 'you',
            message: 'Bạn có khỏe không, lâu rồi mình không gặp nhau'
        },
        {
            own: 'other',
            name: 'Nguyễn Chí Bảo',
            message: 'Tôi khỏe lắm, hôm nào đi cafe nhé'
        },
        {
            own: 'you',
            message: 'Ok luôn bạn ơi :))'
        },
        {
            own: 'you',
            message: 'Bạn có khỏe không, lâu rồi mình không gặp nhau'
        },
        {
            own: 'other',
            name: 'Nguyễn Chí Bảo',
            message: 'Tôi khỏe lắm, hôm nào đi cafe nhé'
        },
        {
            own: 'you',
            message: 'Ok luôn bạn ơi :))'
        },
        {
            own: 'you',
            message: 'Bạn có khỏe không, lâu rồi mình không gặp nhau'
        },
        {
            own: 'other',
            name: 'Nguyễn Chí Bảo',
            message: 'Tôi khỏe lắm, hôm nào đi cafe nhé'
        },
        {
            own: 'you',
            message: 'Ok luôn bạn ơi :))'
        },
        {
            own: 'you',
            message: 'Bạn có khỏe không, lâu rồi mình không gặp nhau'
        },
        {
            own: 'other',
            name: 'Nguyễn Chí Bảo',
            message: 'Tôi khỏe lắm, hôm nào đi cafe nhé'
        },
        {
            own: 'you',
            message: 'Ok luôn bạn ơi :))'
        },
        {
            own: 'you',
            message: 'Bạn có khỏe không, lâu rồi mình không gặp nhau'
        },
        {
            own: 'other',
            name: 'Nguyễn Chí Bảo',
            message: 'Tôi khỏe lắm, hôm nào đi cafe nhé'
        },
        {
            own: 'you',
            message: 'Ok luôn bạn ơi :))'
        },
        {
            own: 'you',
            message: 'Bạn có khỏe không, lâu rồi mình không gặp nhau'
        },
        {
            own: 'other',
            name: 'Nguyễn Chí Bảo',
            message: 'Tôi khỏe lắm, hôm nào đi cafe nhé'
        },
        {
            own: 'you',
            message: 'Ok luôn bạn ơi :))'
        }
    ]);
    const sendMessage = (message) => {
        const sendData = {
            own: 'you',
            message
        };
        setMessageList([...messageList, sendData]);
    }

    const handlePressEnter = (e) => {
        if (e.which === 13) {
            sendMessage(e.target.innerText);
        }
    }

    return (
        <Layout>
            <LayoutLeft>
                <div className={clsx('d-flex', 'flex-col', styles.leftContainer)}>
                    <div className={styles.searchContainer}>
                        <Search placeholder='Tìm kiếm đoạn chat' />
                    </div>
                    <div className={styles.chatsContainer}>
                        <ChatItem active={true} />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                    </div>
                </div>
            </LayoutLeft>
            <LayoutCenter>
                <div className={clsx('d-flex', 'flex-col', styles.centerContainer)}>
                    <div className={styles.infoContainer}>
                        <div className={clsx(styles.infoWrapper, 'd-flex', 'align-center')}>
                            <div className={clsx(styles.chatInfo, 'd-flex')}>
                                <div className={styles.avatar}></div>
                                <div className={clsx('d-flex', 'flex-col')}>
                                    <span className={clsx('text-headline-3', styles.name)}>Nguyễn Chí Bảo</span>
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
                                messageList.map((message, index) => {
                                    if (message.own === 'you') {
                                        return (
                                            <div key={index} className={styles.messageRow}>
                                                <YourMessage
                                                    messageContent={message.message}
                                                />
                                            </div>
                                        );
                                    }
                                    else return (
                                        <div key={index} className={styles.messageRow}>
                                            <OtherMessage
                                                senderName={message.name}
                                                messageContent={message.message}
                                            />
                                        </div>
                                    );
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
                             <div className={clsx(styles.subItemWrapper, 'd-flex', 'align-center', 'cursor-pointer', 'flex-col')}>
                                <div className={styles.subNavContainer}>
                                    <ul>
                                        <li>File phương tiện</li>
                                        <li>File</li>
                                        <li>Liên kết</li>
                                    </ul>
                                </div>
                                <div className={styles.pictureContainer}>
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
