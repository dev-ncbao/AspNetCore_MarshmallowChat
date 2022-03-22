import clsx from "clsx";
import { useState } from "react";
//
import styles from './InputRadio.module.css';
function InputRadio({ name, label, sources = [], onChange, value }) {
    return (
        <>
            <div className={clsx(styles.labelContainer, 'd-flex')}>
                <label className={'text-headline-3'}>{label}</label>
            </div>
            <div className={clsx('d-flex', styles.radioContainer)}>
                {
                    sources.map((source, index) => {
                        return (
                            <div key={source}>
                                <input
                                    key={source}
                                    id={source + index}
                                    className={styles.input}
                                    type='radio' name={name}
                                    onChange={onChange || undefined}
                                    value={source}
                                    checked={source === value} />
                                <label htmlFor={source + index} className={clsx(styles.labelForInput, 'd-flex', 'justify-center', 'align-center', 'text-body-2', 'cursor-pointer', 'user-select-none')}>
                                    {source}
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