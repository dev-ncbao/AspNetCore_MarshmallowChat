
//
import styles from './ContextMenu.module.css';

function ContextMenu({ backdropOnClick, children }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <ul>
                        {children}
                    </ul>
                </div>
            </div>
            <div className={styles.backdropTransparent} onClick={backdropOnClick}></div>
        </>
    )
}

export default ContextMenu
