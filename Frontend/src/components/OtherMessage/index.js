import clsx from "clsx";
//
import styles from './OtherMessage.module.css';

function OtherMessage({ senderName, messageContent }) {
    return (
        <div className={clsx('d-flex', 'flex-col', styles.messageWrapper)}>
            <span className={clsx(styles.senderName, 'text-body-4', 'd-block')}>{senderName}</span>
            <span className={clsx(styles.messageContent, 'text-body-2')}>{`${messageContent}`}</span>
        </div>
    )
}

export default OtherMessage;