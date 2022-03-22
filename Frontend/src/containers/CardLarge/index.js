import styles from './CardLarge.module.css';

function CardForm({children, style}){
    return (
        <div className={styles.container} style={style}>
            {children}
        </div>
    )
}

export default CardForm;