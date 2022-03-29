import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
//
import { useContactStore } from './../../stores/contact';
import { setNavChecked } from './../../stores/contact/actions';
import { NavRounded } from './../../components';
import { Layout, LayoutLeft, LayoutCenter } from './../../containers';
import styles from './Contact.module.css';

function Contact() {
    const [state, dispatch] = useContactStore();
    const { nav, menu } = state;
    return (
        <Layout>
            <LayoutLeft>
                <div className={clsx('d-flex', 'flex-col', styles.leftContainer)}>
                    <div className={styles.subNavContainer}>
                        <NavRounded
                            items={nav.items}
                            checked={nav.checked}
                            dispatch={dispatch}
                            action={setNavChecked}
                        />
                    </div>
                </div>
                <div className={styles.menuContainer}>
                    <Outlet context={{...menu[nav.checked]}}/>
                </div>
            </LayoutLeft>
            <LayoutCenter>
                <div className={clsx('d-flex', 'flex-col', styles.centerContainer)}>
                    {menu[nav.checked].components[menu[nav.checked].checked]}
                </div>
            </LayoutCenter>
        </Layout>
    )
}

export default Contact