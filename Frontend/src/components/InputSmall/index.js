import clsx from 'clsx';
//
import styles from './InputSmall.module.css';

function InputSmall({ label, input = {}, helperText }) {
    return (
        <>
            <div className={clsx(styles.labelContainer, 'd-flex')}>
                <label className={'text-headline-3'}>{label}</label>
            </div>
            <input
                {...input}
                className={clsx(styles.input, 'clear-input-tag', 'text-body-3')}
            />
            <div>
                {!helperText && <div className={clsx('text-body-5', styles.validationMessage)}>{helperText}</div>}
            </div>
        </>
    );
}

export default InputSmall;