import clsx from 'clsx';
//
import { useStore as useContactStore } from './../../stores/contact';
import { setNavChecked, setMenuChecked } from './../../stores/contact/actions';
import { NavSquared, NavRounded } from './../../components';
import { Layout, LayoutLeft, LayoutCenter } from './../../containers';
import styles from './Contact.module.css';

function Contact() {
    const [state, dispatch] = useContactStore();
    const { nav, menu } = state;
    const { checked: navChecked } = nav;
    const { checked: menuChecked } = menu[navChecked];
    return (
        <Layout>
            <LayoutLeft>
                <div className={clsx('d-flex', 'flex-col', styles.leftContainer)}>
                    <div className={styles.navContainer}>
                        <NavRounded
                            {...nav}
                            dispatch={dispatch}
                            actions={{ setNavChecked }}
                        />
                    </div>
                    <div className={styles.menuContainer}>
                        <div className={styles.menuWrapper}>
                            <NavSquared
                                {...menu[navChecked]}
                                dispatch={dispatch}
                                actions={{ setMenuChecked }}
                            />
                        </div>
                    </div>
                </div>
            </LayoutLeft>
            <LayoutCenter>
                <div className={styles.centerContainer}>
                    {menu[navChecked].components[menuChecked]}
                </div>
            </LayoutCenter>
        </Layout>
    )
}

export default Contact