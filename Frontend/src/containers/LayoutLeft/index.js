import styles from './LayoutLeft.module.css';

function LayoutLeft({children}){
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default LayoutLeft;