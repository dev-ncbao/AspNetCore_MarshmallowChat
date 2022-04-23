import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//
import { Header } from './../../features';
import { Body, AppContainer } from './../../containers';
import { login } from './../../apis';
import { https, routes } from '../../constants';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const callback = async () => {
            if (!routes.ALLOW_ANONYMOUS.includes(location.pathname)) {
                const response = await login.check().catch(() => {
                    navigate(routes.ROUTES.LOGIN);
                });
                if(!response) return
                if (response.status === https.STATUS_CODE.UNAUTHORIZED)
                    navigate(routes.ROUTES.LOGIN);
                else if (response.status === https.STATUS_CODE.OK && location.pathname === routes.ROUTES.HOME)
                    navigate(routes.ROUTES.CHAT());
            }
        }
        callback();
    }, []);

    return (
        <AppContainer>
            <Header />
            <Body />
        </AppContainer>
    )
}

export default Home