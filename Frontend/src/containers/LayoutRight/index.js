import styles from './LayoutRight.module.css';

function LayoutRight({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default LayoutRight;