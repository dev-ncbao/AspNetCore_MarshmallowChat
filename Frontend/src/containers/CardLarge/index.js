import styles from './CardLarge.module.css';

function CardForm({children}){
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default CardForm;