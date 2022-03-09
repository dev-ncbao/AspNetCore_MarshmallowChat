import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
//
import styles from './NavItem.module.css';

function NavItem({ path, children }) {
    return (
        <NavLink
            to={path}
            className={({isActive}) => {
                    return clsx(
                        styles.container,
                        {
                            [styles.active]: isActive
                        },
                        'd-flex',
                        'align-center',
                        'justify-center',
                        'clear-atag',
                    )
                }
            }
        >
            {children}
        </NavLink>
    );
}

export default NavItem;