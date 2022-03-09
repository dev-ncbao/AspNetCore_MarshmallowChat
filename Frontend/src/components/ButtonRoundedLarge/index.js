import clsx from "clsx";
//
import styles from './ButtonRoundedLarge.module.css';

function ButtonRoundedLarge({content, onClick}){
    return (
        <button onClick={onClick} className={clsx(styles.container, 'user-select-none', 'clear-button-tag', 'text-body-2', 'cursor-pointer')}>
            {content}
        </button>
    );
}

export default ButtonRoundedLarge;