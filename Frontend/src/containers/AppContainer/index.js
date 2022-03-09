import clsx from 'clsx';
//
import styles from './AppContainer.module.css';

function AppContainer({children}) {
    return (
        <div className={clsx(styles.container, 'd-flex', 'justify-center')}>
            <div className={(clsx(styles.wrapper, 'd-flex', 'flex-col'))}>
                {children}
            </div>
        </div>
    )
}

export default AppContainer;