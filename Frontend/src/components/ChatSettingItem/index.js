import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
//
import styles from './ChatSettingItem.module.css';

const subSettingItems = [
    {
        name: 'abc',
        icon: faImage
    },
    {
        name: 'xyz',
        icon: faPencil
    }
]

function ChatSettingItem({ icon, itemName, children }) {
    const [toggle, settoggle] = useState(false);
    const handleToggleItems = () => {
        settoggle(!toggle);
    }

    return (
        <div className={clsx(styles.itemContainer, 'user-select-none')}>
            <div onClick={handleToggleItems} className={clsx(styles.itemWrapper, 'd-flex', 'align-center', 'cursor-pointer')}>
                <span className={clsx(styles.itemName, 'text-body-1')}>{itemName}</span>
                {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
            </div>
            {
                toggle && children
            }
        </div>
    )
}

export default ChatSettingItem
