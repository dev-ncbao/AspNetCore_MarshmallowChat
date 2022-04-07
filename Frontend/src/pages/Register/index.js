import { Link } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
//
import styles from './Register.module.css';
import { InputLarge, InputSmall, ButtonRounded, InputRadio } from './../../components';
import { CardLarge, AppContainer } from '../../containers';
import { UserValidation } from './../../validations';
import { register } from './../../apis';
import { api } from './../../constants';

function Register() {
    const [account, setAccount] = useState({
        FirstName: '',
        LastName: '',
        Gender: 'Nam',
        DayOfBirth: new Date().toISOString().substring(0, 10),
        Email: '',
        Username: '',
        Password: '',
        PasswordSecondary: ''
    });
    const [validations, setValidations] = useState({
        FirstName: {},
        LastName: {},
        Gender: {},
        DayOfBirth: {},
        Email: {},
        Username: {},
        Password: {},
        PasswordSecondary: {},
        ServerResponse: {}
    });
    const [registered, setRegistered] = useState(false);
    const navigate = useNavigate();

    const validationUser = () => {
        let validColumns = { ...validations };
        validColumns.FirstName = UserValidation.firstName(account.FirstName);
        validColumns.LastName = UserValidation.lastName(account.LastName);
        validColumns.Gender = UserValidation.gender(account.Gender);
        validColumns.DayOfBirth = UserValidation.dayOfBirth(account.DayOfBirth);
        validColumns.Username = UserValidation.username(account.Username);
        validColumns.Email = UserValidation.email(account.Email);
        validColumns.Password = UserValidation.password(account.Password);
        validColumns.PasswordSecondary = UserValidation.passwordSecondary(account.PasswordSecondary, account.Password);
        let isAllValid = true;
        for (const column in validColumns) {
            if (validColumns[column].isValid === false) {
                isAllValid = false;
                break;
            }
        }
        if (isAllValid)
            return true;
        else {
            setValidations(validColumns);
            return false;
        }
    }

    const handleRegister = async () => {
        if (registered) {
            navigate('/login');
        } else {
            let isValid = validationUser();
            let user = { ...account };
            delete user.PasswordSecondary;
            if (isValid) {
                const response = await register.post(JSON.stringify(user));
                if (response.status === api.STATUS_CODE.CONFLICT
                    || response.status === api.STATUS_CODE.INTERNAL_SERVER_ERROR) {
                    response.clone().json().then(data => {
                        let validColumns = { ...validations };
                        validColumns.ServerResponse = { message: data.message };
                        setValidations(validColumns);
                    });
                }
                else if (response.status === api.STATUS_CODE.CREATED) {
                    setRegistered(true);
                }
            }
        }
    }

    const handleChange = (e) => {
        setAccount(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <AppContainer>
            <div className={styles.container}>
                <CardLarge>
                    <label className={'text-headline-1'}>Đăng ký tài khoản</label>
                    {registered ?
                        <div>
                            <span className={styles.content}>Đăng ký tài khoản thành công.</span>
                        </div>
                        : <>
                            <div className={clsx('d-flex', styles.inputFlexGap)}>
                                <div>
                                    <InputSmall
                                        input={{ onChange: handleChange, name: 'FirstName', type: 'text', value: account.FirstName }}
                                        label='Họ và tên lót'
                                    />
                                </div>
                                <div>
                                    <InputSmall
                                        input={{ onChange: handleChange, name: 'LastName', type: 'text', value: account.LastName }}
                                        label='Tên'
                                    />
                                </div>
                            </div>
                            <div className={clsx('d-flex', styles.inputFlexGap)}>
                                <div>
                                    <InputRadio
                                        onChange={handleChange}
                                        name='Gender'
                                        label='Giới tính'
                                        sources={['Nam', 'Nữ', 'Khác']}
                                        value={account.Gender}
                                    />
                                </div>
                                <div>
                                    <InputSmall
                                        input={{
                                            onChange: handleChange,
                                            name: 'DayOfBirth',
                                            type: 'date',
                                            value: account.DayOfBirth,
                                            max: new Date().toISOString().substring(0, 10),
                                            min: new Date(new Date().setFullYear(new Date().getFullYear() - 120)).toISOString().substring(0, 10),
                                        }}
                                        label='Ngày sinh'
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLarge
                                    input={{ value: account.Username, onChange: handleChange, name: 'Username', type: 'text' }}
                                    label='Tên đăng nhập'
                                    helperText='Độ dài 8 - 20 kí tự'
                                />
                            </div>
                            <div>
                                <InputLarge
                                    input={{ onChange: handleChange, name: 'Email', type: 'text', value: account.Email }}
                                    label='Email'
                                />
                            </div>
                            <div>
                                <InputLarge
                                    input={{ onChange: handleChange, name: 'Password', type: 'password', value: account.Password }}
                                    label='Mật khẩu'
                                    helperText={`Độ dài 8 - 20 kí tự${'\n'}Phải bao gồm: Chữ in hoa, chữ thường, chữ số và kí tự đặc biệt`}
                                />
                            </div>
                            <div>
                                <InputLarge
                                    input={{ onChange: handleChange, name: 'PasswordSecondary', type: 'password', value: account.PasswordSecondary }}
                                    label='Nhập lại mật khẩu'
                                />
                            </div>
                        </>}
                    <div className={clsx('d-flex', styles.buttonContainer, 'align-center')}>
                        {!registered && <>
                            <div className={styles.validationMessage}>
                                <ul className='text-body-4'>
                                    {
                                        Object.values(validations).map((validation, index) => {
                                            return <li key={index}>{validation.message}</li>;
                                        })
                                    }
                                </ul>
                            </div>
                        </>}
                        <ButtonRounded onClick={handleRegister} >{registered ? 'Trở về Đăng nhập' : 'Đăng ký'}</ButtonRounded>
                        {!registered && <span>Đã có tài khoản? <Link to='/login' className={clsx('user-select-none', 'clear-a-tag', 'link-color', 'text-body-1')}>Đăng nhập</Link></span>}
                    </div>
                </CardLarge>
            </div>
        </AppContainer>
    );
}

export default Register