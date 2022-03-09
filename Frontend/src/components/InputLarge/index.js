import clsx from 'clsx';
//
import styles from './InputLarge.module.css';

function InputLarge({ labelLeft, componentRight, type, placeholder }) {
    return (
        <>
            <div className={clsx(styles.labelContainer, 'd-flex')}>
                <label className={'text-headline-3'}>{labelLeft}</label>
                {componentRight || ''}
            </div>
            <input className={clsx(styles.input, 'clear-input-tag', 'text-body-3')} type={type} placeholder={placeholder || null} />
        </>
    );
}

export default InputLarge;