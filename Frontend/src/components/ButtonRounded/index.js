import clsx from "clsx";
//
import styles from './ButtonRounded.module.css';

function ButtonRounded({children, onClick}){
    return (
        <button onClick={onClick} className={clsx(styles.container, 'user-select-none', 'clear-button-tag', 'text-body-2', 'cursor-pointer')}>
            {children}
        </button>
    );
}

export default ButtonRounded;