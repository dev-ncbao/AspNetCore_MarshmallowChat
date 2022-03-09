import { Link } from 'react-router-dom';
import clsx from 'clsx';
//
import styles from './Register.module.css';
import { InputLarge, InputSmall, ButtonRoundedLarge, InputRadio } from './../../components';
import { CardLarge, AppContainer } from '../../containers';

function Register() {
    const handleRegister = () => {

    }

    return (
        <AppContainer>
            <div className={styles.container}>
                <CardLarge>
                    <label className={'text-headline-1'}>Đăng ký tài khoản</label>
                    {/* row */}
                    <div className={clsx('d-flex', 'flex-row', styles.inputFlexGap)}>
                        <div className={clsx('d-flex', styles.inputFlexGap)}>
                            <div>
                                <InputSmall
                                    label='Họ và tên lót'
                                    type='text'
                                />
                            </div>
                            <div>
                                <InputSmall
                                    label='Tên'
                                    type='text'
                                />
                            </div>
                        </div>
                        <div className={clsx('d-flex', styles.inputFlexGap)}>
                            <div>
                                <InputRadio
                                    label='Giới tính'
                                    name='gender'
                                    values={['Nam', 'Nữ', 'Khác']}
                                />
                            </div>
                            <div>
                                <InputSmall
                                    label='Ngày sinh'
                                    type='date'
                                />
                            </div>
                        </div>
                    </div>
                    {/* end row */}
                    {/* row */}
                    <div className={clsx('d-flex', 'flex-row', styles.inputFlexGap)}>
                        <div>
                            <InputLarge
                                labelLeft='Tên đăng nhập'
                                type='text'
                            />
                        </div>
                        <div>
                            <InputLarge
                                labelLeft='Email'
                                type='text'
                            />
                        </div>
                    </div>
                    {/* end row */}
                    {/* row */}
                    <div className={clsx('d-flex', 'flex-row', styles.inputFlexGap)}>
                        <div>
                            <InputLarge
                                labelLeft='Mật khẩu'
                                type='password'
                            />
                        </div>
                        <div>
                            <InputLarge
                                labelLeft='Nhập lại mật khẩu'
                                type='password'
                            />
                        </div>
                    </div>
                    {/* end row */}
                    <div className={clsx('d-flex', styles.buttonContainer, 'align-center')}>
                        <ButtonRoundedLarge content='Đăng ký' onClick={handleRegister} />
                        <span>Đã có tài khoản? <Link to='/login' className={clsx('user-select-none', 'clear-a-tag', 'link-color', 'text-body-1')}>Đăng nhập</Link></span>
                    </div>
                </CardLarge>
            </div>
        </AppContainer>
    );
}

export default Register