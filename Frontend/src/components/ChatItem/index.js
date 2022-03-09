import clsx from 'clsx';
//
import styles from './ChatItem.module.css';

function ChatItem({active}) {
    return (
        <div className={clsx('cursor-pointer', styles.container, {[styles.active] : active})}>
            <div className={clsx('d-flex', 'w-100', styles.wrapper)}>
                <div className={styles.avatar}></div>
                <div className={clsx(styles.infoContainer, 'd-flex', 'flex-col')}>
                    <div className={clsx('d-flex', styles.infoTopContainer)}>
                        <span className={clsx('text-body-1', styles.name)}>Nguyễn Chí Bảo</span>
                        <span className={clsx('text-body-4', styles.sentTime)}>1 phút</span>
                    </div>
                    <div className={styles.infoBottomContainer}>
                        <span className={clsx('text-body-4', styles.lastMessage)}>Chào bạn!</span>
                        {/* <span></span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatItem;