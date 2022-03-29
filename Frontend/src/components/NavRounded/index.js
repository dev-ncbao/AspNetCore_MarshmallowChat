import { useState } from 'react';
//
import styles from './NavRounded.module.css';

function NavRounded({ items = [], children }) {
    const [checked, setChecked] = useState(0);

    const handleItemClick = (index) => {
        setChecked(index);
    }

    return (
        <>
            <ul className={styles.ul}>
                {items.map((item, index) => {
                    return (
                        <li key={index} className={index === checked ? styles.itemChecked : ''} onClick={() => handleItemClick(index)}>{item}</li>
                    )
                })}
            </ul>
            {children}
        </>
    )
}

export default NavRounded;
