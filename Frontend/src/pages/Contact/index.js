import { faEllipsis, faUserGroup, faUserPlus, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
//
import { useContactStore } from './../../stores/contact';
import { Search, NavRounded, NavSquare } from './../../components';
import { Layout, LayoutLeft, LayoutCenter } from './../../containers';
import styles from './Contact.module.css';

function Contact() {
    const [state, dispatch] = useContactStore();
    const { nav, subNav } = state;
    return (
        <Layout>
            <LayoutLeft>
                <div className={clsx('d-flex', 'flex-col', styles.leftContainer)}>
                    <div className={styles.subNavContainer}>
                        <NavRounded
                            items={nav.item}
                        />
                    </div>
                </div>
                <div className={styles.menuContainer}>
                    <NavSquare
                        items={subNav.item}
                        icons={subNav.icon}
                    />
                </div>
            </LayoutLeft>
            <LayoutCenter>
                <div className={clsx('d-flex', 'flex-col', styles.centerContainer)}>
                    <Search />
                    <div className={styles.usersContainer}>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <div className={styles.userInfoContainer}>
                                <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                                <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                                <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <div className={styles.userInfoContainer}>
                                <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                                <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                                <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <div className={styles.userInfoContainer}>
                                <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                                <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                                <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <div className={styles.userInfoContainer}>
                                <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                                <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                                <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <div className={styles.userInfoContainer}>
                                <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                                <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                                <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonOption)}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.userContainer}>
                            <div className={styles.userAvatar}></div>
                            <div className={styles.userInfoContainer}>
                                <span className={clsx(styles.userName, 'text-headline-3')}>Nguyễn Chí Bảo</span>
                                <span className={clsx(styles.userUsername, 'text-body-2')}>@ncb1403</span>
                                <span className={clsx(styles.userProvince, 'text-body-2')}>Cần Thơ</span>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonChatTo)}>Nhắn tin</button>
                                <button className={clsx('clear-button-tag', 'text-body-2', styles.buttonOption)}>
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