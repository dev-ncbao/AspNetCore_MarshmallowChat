import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
//
import styles from './NavSquare.module.css';

function NavSquare({ items = [], icons = [] }) {
    const [checked, setChecked] = useState(0);

    const handleItemClick = (index) => {
        setChecked(index);
    }

    return (
        <ul className={styles.ul}>
            {items.map((item, index) => {
                return (
                    <li key={index} className={ index === checked ? styles.itemChecked : '' } onClick={() => handleItemClick(index)}><FontAwesomeIcon icon={icons[index]} />{item}</li>
                )
            })}
        </ul>
    )
}

export default NavSquare
