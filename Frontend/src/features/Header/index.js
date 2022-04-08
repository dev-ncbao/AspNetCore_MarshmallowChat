import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBell, faComment, faUserGroup, faArrowRightFromBracket, faKey } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
//
import { Navigation, ContextMenu } from './../../features'
import { ButtonCircular, ContextMenuItem } from '../../components'
import { routes } from './../../constants'
import Logo from './../../assets/img/Logo.png'
import styles from './Header.module.css'
//
import { login } from './../../apis'

function Header() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const navigate = useNavigate()
    const navigationItems = [
        {
            name: 'Nhắn tin',
            path: routes.ROUTES.CHAT,
            icon: <FontAwesomeIcon icon={faComment} />
        },
        {
            name: 'Liên hệ',
            path: routes.ROUTES.CONTACT,
            icon: <FontAwesomeIcon icon={faUserGroup} />
        }
    ]
    const contextMenuItems = [
        {
            name: 'Đổi mật khẩu',
            description: '',
            icon: faKey,
            onClick: () => {
                navigate(routes.ROUTES.LOGIN)
            }
        },
        {
            name: 'Đăng xuất',
            description: '',
            icon: faArrowRightFromBracket,
            onClick: () => {
                navigate(routes.ROUTES.LOGIN)
            }
        }
    ]

    const handleToggleNotification = () => {
        console.log('toggle noti');
        login.test(JSON.stringify({
            username: 'nguyebao',
            password: '123456789'
        }))

    }

    const handleToggleMenu = () => {
        setToggleMenu(prev => !prev)
    }

    return (
        <div className={clsx(styles.container, 'd-flex')}>
            <div className={clsx('d-flex', styles.wrapper)}>
                {/* Logo */}
                <div className={clsx(styles.logoContainer)}>
                    <Link to='/' className={clsx('d-flex', 'align-center', styles.logoWrapper, 'cursor-pointer', 'user-select-none', 'clear-a-tag')}>
                        <img className={styles.logo} src={Logo} alt='Logo' />
                        <span className='text-headline-2'>Marshmallow chat</span>
                    </Link>
                </div>
                {/* Navigation */}
                <div className={clsx('d-flex', 'align-center', styles.navigationContainer)}>
                    <Navigation items={navigationItems} />
                </div >
                {/* ContextMenu and Notification*/}
                <div className={clsx('d-flex', 'align-center', styles.menuContainer)}>
                    <div className={styles.menuItemContainer}>
                        <ButtonCircular onClick={handleToggleNotification}>
                            <FontAwesomeIcon icon={faBell} />
                        </ButtonCircular>
                    </div>
                    <div className={styles.menuItemContainer}>
                        <ButtonCircular onClick={handleToggleMenu}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </ButtonCircular>
                        {toggleMenu && (
                            <div className={clsx(styles.contextMenuContainer, 'header-context-menu')}>
                                <ContextMenu backdropOnClick={handleToggleMenu}>
                                    {
                                        contextMenuItems.map((item, index) => {
                                            return (
                                                <ContextMenuItem key={index} name={item.name} description={item.description} icon={<FontAwesomeIcon icon={item.icon} />} onClick={item.onClick} />
                                            )
                                        })
                                    }
                                </ContextMenu>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
