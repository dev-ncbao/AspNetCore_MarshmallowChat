import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
//
import { Search } from './../../components';
import { Layout, LayoutLeft, LayoutCenter } from './../../containers';
import styles from './Contact.module.css';

function Contact() {
    return (

        <Layout>
            <LayoutLeft>
                <div className={clsx('d-flex', 'flex-col', styles.leftContainer)}>
                    <div className={styles.subNavContainer}>
                        <ul>
                            <li>Bạn bè</li>
                            <li>Nhóm chat</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.menuContainer}>
                    <ul>
                        <li>Danh sách bạn bè</li>
                        <li>Thêm bạn mới</li>
                        <li>Lời mời kết bạn</li>
                    </ul>
                </div>
            </LayoutLeft>
            <LayoutCenter>
                <div className={clsx('d-flex', 'flex-col', styles.centerContainer)}>
                    <Search />
                    <div className={styles.usersContainer}>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                            <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                            <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                            <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                            <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                            <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                            <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                            <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                            <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                            <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                            <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                            <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                            <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </LayoutCenter>

        </Layout>
    )
}

export default Contact