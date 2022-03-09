import { Link } from 'react-router-dom';
import clsx from 'clsx';
//
import styles from './Login.module.css';
import { InputLarge, ButtonRoundedLarge } from './../../components';
import { CardLarge, AppContainer } from '../../containers';

function Login() {
    const handleLogin = () => {

    }

    return (
        <AppContainer>
            <div className={styles.container}>
                <CardLarge>
                    <label className={'text-headline-1'}>Đăng nhập</label>
                    <div>
                        <InputLarge
                            labelLeft='Tài khoản'
                            componentRight={
                                <label className='text-body-3'>Chưa có tài khoản? <Link className={clsx('user-select-none', 'clear-a-tag', 'link-color', 'text-body-1')} to='/register'>Đăng ký</Link></label>
                            }
                            type='text'
                            placeholder='Tên đăng nhập hoặc email'
                        />
                    </div>
                    <div>
                        <InputLarge
                            labelLeft='Mật khẩu'
                            type='password'
                        />
                    </div>
                    <div className={clsx('d-flex', styles.buttonContainer, 'align-center')}>
                        <ButtonRoundedLarge content='Đăng nhập' onClick={handleLogin} />
                        <Link to='/reset-password' className={clsx('user-select-none', 'clear-a-tag', 'link-color', 'text-body-1')}>Quên mật khẩu?</Link>
                    </div>
                </CardLarge>
            </div>
        </AppContainer>
    );
}

export default Login