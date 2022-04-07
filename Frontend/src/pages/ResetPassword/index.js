import { Link } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
//
import styles from './ResetPassword.module.css';
import { InputLarge, ButtonRounded } from './../../components';
import { CardLarge, AppContainer } from '../../containers';

function ResetPassword() {
    const [reseted, setReseted] = useState(false);
    const navigate = useNavigate();
    const handleButtonClick = () => {
        switch (reseted) {
            case true: {
                navigate('/login');
                break;
            }
            case false: {
                setReseted(true);
                break;
            }
            default: break;
        }
    }

    return (
        <AppContainer>
            <div className={styles.container}>
                <CardLarge>
                    <label className={'text-headline-1'}>{reseted ? 'Thành công!' : 'Lấy lại mật khẩu'}</label>
                    <div>
                        <span className={styles.content}>
                            {
                                reseted ?
                                    'Chúng tôi đã gửi mật khẩu mới về email của bạn. Hãy sử dụng mật khẩu đó cho lần đăng nhập tiếp theo.'
                                    : 'Chúng tôi sẽ gửi mật khẩu mới về email của bạn.'
                            }
                        </span>
                    </div>
                    {
                        !reseted &&
                        <div>
                            <InputLarge
                                labelLeft='Tên đăng nhập hoặc email'
                                type='text'
                            />
                        </div>
                    }
                    <div className={clsx('d-flex', styles.buttonContainer, 'align-center')}>
                        <ButtonRounded onClick={handleButtonClick} >{reseted ? 'Trở về Đăng nhập' : 'Gửi yêu cầu'}</ButtonRounded>
                        {!reseted && <span>
                            {'Quay lại trang '}
                            <Link to='/login' className={clsx('user-select-none', 'clear-a-tag', 'link-color', 'text-body-1')}>
                                Đăng nhập
                            </Link>
                        </span>}
                    </div>
                </CardLarge>
            </div>
        </AppContainer>
    );
}

export default ResetPassword