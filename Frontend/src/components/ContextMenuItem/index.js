import clsx from 'clsx';
//
import styles from './ContextMenuItem.module.css';

function ContextMenuItem({name, description, icon, onClick}) {
    return (
        <li onClick={onClick}>
            <div className={clsx('d-flex', styles.container)}>
                <div className={styles.icon}>
                    {icon}
                </div>
                <div className={styles.info}>
                    <span className={clsx(styles.name, 'text-body-2')}>{name}</span>
                    <span className={clsx(styles.description, 'text-body-4')}>{description}</span>
                </div>
            </div>
        </li>
    )
}

export default ContextMenuItem;