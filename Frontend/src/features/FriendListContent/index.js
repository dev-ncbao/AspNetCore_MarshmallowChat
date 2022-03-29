import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
//
import { Search } from './../../components';
import styles from './FriendListContent.module.css';

function FriendListContent() {
    return (
        <>
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
        </>
    )
}

export default FriendListContent
