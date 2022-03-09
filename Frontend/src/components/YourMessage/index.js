import clsx from "clsx";
//
import styles from './YourMessage.module.css';

function YourMessage({ messageContent }) {
    return (
        <div className={clsx('d-flex', styles.messageWrapper, styles.yourMessage)}>
            <span className={clsx(styles.messageContent, styles.yourMessageContent, 'text-body-2')}>
                {`${messageContent}`}
            </span>
        </div>
    )
}

export default YourMessage
