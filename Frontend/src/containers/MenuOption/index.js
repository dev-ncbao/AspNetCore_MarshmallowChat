import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
//
import styles from './MenuOption.module.css';

function MenuOption() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <ul>
                    <li>
                        <div className={clsx('d-flex', styles.optionContainer)}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                            <div className={styles.optionInfo}>
                                <span className={clsx(styles.optionName, 'text-body-2')}>Hình ảnh</span>
                                <span className={clsx(styles.optionDescription, 'text-body-4')}>Ấn vào để xem hình ảnh</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={clsx('d-flex', styles.optionContainer)}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                            <div className={styles.optionInfo}>
                                <span className={clsx(styles.optionName, 'text-body-2')}>Hình ảnh</span>
                                <span className={clsx(styles.optionDescription, 'text-body-4')}>Ấn vào để xem hình ảnh</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={clsx('d-flex', styles.optionContainer)}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                            <div className={styles.optionInfo}>
                                <span className={clsx(styles.optionName, 'text-body-2')}>Hình ảnh</span>
                                <span className={clsx(styles.optionDescription, 'text-body-4')}>Ấn vào để xem hình ảnh</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuOption
