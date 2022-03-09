import clsx from 'clsx';
import styles from './ButtonCircle.module.css';

function ButtonCircle({ children, onClick }) {
    return (
        <button
            className={clsx(
                styles.container,
                'd-flex',
                'align-center',
                'justify-center',
                'cursor-pointer',
                'clear-button-tag',
                'user-select-none'
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonCircle;