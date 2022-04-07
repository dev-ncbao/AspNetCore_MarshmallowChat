import styles from './NavRounded.module.css';
// 

function NavRounded({ items, checked, dispatch, actions }) {
    const handleItemClick = (index) => {
        dispatch(actions.setNavChecked({ checked: index }));
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
        </>
    )
}

export default NavRounded;
