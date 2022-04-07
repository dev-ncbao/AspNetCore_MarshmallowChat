import clsx from 'clsx';
//
import styles from './ButtonCircular.module.css';

function ButtonCircular({ children, onClick }) {
    return (
        <button onClick={onClick}className={clsx(styles.container, 'd-flex', 'align-center', 'justify-center', 'cursor-pointer', 'clear-button-tag', 'user-select-none')}>
            {children}
        </button>
    );
}

export default ButtonCircular;