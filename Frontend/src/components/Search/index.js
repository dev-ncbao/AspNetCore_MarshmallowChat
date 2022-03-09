import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
//
import styles from './Search.module.css'

function Search({placeholder, onClick}) {
    return (
        <div className={clsx(styles.container, 'd-flex')}>
            <button onClick={onClick} className={clsx('d-flex', 'align-center', 'cursor-pointer', 'clear-button-tag', styles.iconContainer)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
            </button>
            <input className={clsx(styles.input, 'clear-input-tag', 'text-body-2')} type='text' placeholder={placeholder || 'Tìm kiếm'} />
        </div>
    )
}

export default Search;