import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faBell } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
//
import { MenuOption } from './../../containers';
import { NavItem, ButtonCircle } from '../../components';
import { navItems } from './nav.config';
import Logo from './../../assets/img/Logo.png';
import styles from './Header.module.css'

function Header() {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggleNotification = () => {
        console.log('toggle noti');
    }

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    }

    return (
        <div className={clsx(styles.container, 'd-flex')}>
            <div className={clsx('d-flex', styles.headerWrapper)}>
                {/* Logo */}
                <div className={clsx(styles.logoContainer)}>
                    <Link to='/'
                        className={clsx('d-flex', 'align-center', styles.logoWrapper, 'cursor-pointer', 'user-select-none', 'clear-a-tag')}
                    >
                        <img className={styles.logo} src={Logo} alt='Logo' />
                        <span className='text-headline-2'>Marshmallow chat</span>
                    </Link>
                </div>
                {/* Navigation */}
                <div className={clsx('d-flex', 'align-center', styles.navigationContainer)}>
                    {
                        navItems.map((item, index) => {
                            return <NavItem key={index} path={item.path}>{item.Icon}</NavItem>
                        })
                    }
                </div >
                {/* Menu and Notification*/}
                <div className={clsx('d-flex', 'align-center', styles.menuContainer)}>
                    <div className={styles.menuItemContainer}>
                        <ButtonCircle onClick={handleToggleNotification}>
                            <FontAwesomeIcon icon={faBell} />
                        </ButtonCircle>
                        {/* <div className={styles.mainMenuContainer}>
                            <MenuOption />
                        </div> */}
                    </div>
                    <div className={styles.menuItemContainer}>
                        <ButtonCircle onClick={handleToggleMenu}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </ButtonCircle>
                        {toggleMenu && (
                            <div className={styles.mainMenuContainer}>
                                <MenuOption />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
