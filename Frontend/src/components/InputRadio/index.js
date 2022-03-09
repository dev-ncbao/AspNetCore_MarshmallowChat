import clsx from "clsx";
import { useState } from "react";
//
import styles from './InputRadio.module.css';
function InputRadio({ name, label, values = [] }) {
    const [check, setCheck] = useState('Nam');

    const handleChange = (e) => {
        setCheck(e.target.value);
    }

    return (
        <>
            <div className={clsx(styles.labelContainer, 'd-flex')}>
                <label className={'text-headline-3'}>{label}</label>
            </div>
            <div className={clsx('d-flex', styles.radioContainer)}>
                {
                    values.map((value, index) => {
                        return (
                            <div key={value}>
                                <input key={value} id={value + index} className={styles.input} type='radio' name={name} onChange={handleChange} value={value} checked={value === check} />
                                <label htmlFor={value + index} className={clsx(styles.labelForInput, 'd-flex', 'justify-center', 'align-center', 'text-body-2', 'cursor-pointer', 'user-select-none')}>
                                    {value}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default InputRadio;