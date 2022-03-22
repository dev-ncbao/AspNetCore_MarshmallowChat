import clsx from 'clsx';
//
import styles from './InputLarge.module.css';

function InputLarge({ label, labelRightSide, input = {}, helperText}) {
    return (
        <>
            <div className={clsx(styles.labelContainer, 'd-flex')}>
                <label className={'text-headline-3'}>{label}</label>
                {labelRightSide || ''}
            </div>
            <input
                {...input}
                className={clsx(styles.input, 'clear-input-tag', 'text-body-3')}
            />
            <div>
                {helperText && <div className={clsx('text-body-5', styles.helperText)}>{helperText}</div>}
            </div>
        </>
    );
}

export default InputLarge;