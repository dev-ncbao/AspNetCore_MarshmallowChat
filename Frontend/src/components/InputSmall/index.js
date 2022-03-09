import clsx from 'clsx';
//
import styles from './InputSmall.module.css';

function InputSmall({ label, type, placeholder }) {
    return (
        <>
            <div className={clsx(styles.labelContainer, 'd-flex')}>
                <label className={'text-headline-3'}>{label}</label>
            </div>
            <input className={clsx(styles.input, 'clear-input-tag', 'text-body-3')} type={type} placeholder={placeholder || null} />
        </>
    );
}

export default InputSmall;