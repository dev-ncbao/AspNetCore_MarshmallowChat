import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//
import styles from './Login.module.css';
import { InputLarge, ButtonRoundedLarge } from './../../components';
import { CardLarge, AppContainer } from '../../containers';
import { login } from './../../apis';
import { api, cookie } from './../../constants';

function Login() {
    const [validation, setValidation] = useState('');
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        Username: '',
        Password: ''
    });

    const handleLogin = async () => {
        if (account.Username.length === 0 || account.Password.length === 0) return;
        const response = await login.post(JSON.stringify(account));
        if (response.status === api.STATUS_CODE.UNAUTHORIZED) {
            await response.clone().json().then(data => {
                setValidation(data.message);
            })
        } else if (response.status === api.STATUS_CODE.OK) {
            await response.clone().json().then(data => {
                document.cookie = `${cookie.TOKEN}=${data.token}`;
                document.cookie = `${cookie.USER_ID}=${data.userId}`;
                localStorage.setItem("expireTime", data.expireTime);
            });
            navigate('/', { replace: true });
        }
    }

    const handleChange = (e) => {
        setAccount(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <AppContainer>
            <div className={styles.container}>
                <CardLarge>
                    <label className={'text-headline-1'}>Đăng nhập</label>
                    <div>
                        <InputLarge
                            label='Tài khoản'
                            labelRightSide={
                                <label className='text-body-3'>Chưa có tài khoản? <Link className={clsx('user-select-none', 'clear-a-tag', 'link-color', 'text-body-1')} to='/register'>Đăng ký</Link></label>
                            }
                            input={{
                                onChange: handleChange,
                                type: 'text',
                                placeholder: 'Tên đăng nhập hoặc email',
                                name: 'Username',
                                value: account.Username
                            }}
                        />
                    </div>
                    <div>
                        <InputLarge
                            label='Mật khẩu'
                            input={{
                                onChange: handleChange,
                                type: 'password',
                                name: 'Password',
                                value: account.Password
                            }}
                        />
                    </div>
                    <div className={clsx('d-flex', styles.buttonContainer, 'align-center')}>
                        {validation !== '' && <>
                            <div className={styles.validationMessage}>
                                <ul className='text-body-4'>
                                    <li>{validation}</li>
                                </ul>
                            </div>
                        </>}
                        <ButtonRoundedLarge content='Đăng nhập' onClick={handleLogin} />
                        <Link to='/reset-password' className={clsx('user-select-none', 'clear-a-tag', 'link-color', 'text-body-1')}>Quên mật khẩu?</Link>
                    </div>
                </CardLarge>
            </div>
        </AppContainer>
    );
}

export default Login