import styles from './ContactCard.module.css';

function ContactCard({ children }) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default ContactCard
