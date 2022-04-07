import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//
import styles from './NavSquared.module.css';

function NavSquared({ items, icons, checked, dispatch, actions }) {
    const handleItemChecked = (index) => {
        dispatch(actions.setMenuChecked({ checked: index }));
    }
    return (
        <ul className={styles.ul}>
            {items.map((item, index) => {
                return (
                    <li key={index} className={index === checked ? styles.itemChecked : ''} onClick={() => handleItemChecked(index)}> <FontAwesomeIcon icon={icons[index]} />{item}</li>
                )
            })}
        </ul >
    )
}

export default NavSquared
