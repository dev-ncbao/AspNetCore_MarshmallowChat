import clsx from "clsx";
//
import styles from './Layout.module.css';

function Layout({ children }) {
    return (
        <div className={clsx('d-flex', 'justify-center', styles.container)}>
            <div className={clsx(styles.wrapper, 'd-flex')}>
                {children}
            </div>
        </div>
    )
};

export default Layout;