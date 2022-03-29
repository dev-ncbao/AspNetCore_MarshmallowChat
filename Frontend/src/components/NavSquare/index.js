import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOutletContext } from 'react-router-dom';
//
import styles from './NavSquare.module.css';

function NavSquare() {
    const context = useOutletContext();
    const {items, icons, checked} = context;
    return (
        <ul className={styles.ul}>
            {items.map((item, index) => {
                return (
                    <li key={index} className={ index === checked ? styles.itemChecked : '' }><FontAwesomeIcon icon={icons[index]} />{item}</li>
                )
            })}
        </ul>
    )
}

export default NavSquare
