import styles from './LayoutCenter.module.css';

function LayoutCenter({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default LayoutCenter;