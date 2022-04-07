import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//
import { Header } from './../../features';
import { Body, AppContainer } from './../../containers';
import { login } from './../../apis';
import { api, route } from '../../constants';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(async () => {
        if (!route.ALLOW_ANONYMOUS.includes(location.pathname)) {
            const response = await login.check().catch(() => {
                navigate(route.ROUTES.LOGIN);
            });
            if (response.status === api.STATUS_CODE.UNAUTHORIZED)
                navigate(route.ROUTES.LOGIN);
            else if (response.status === api.STATUS_CODE.OK && location.pathname === route.ROUTES.HOME)
                navigate(route.ROUTES.CHAT);
        }
    }, [location.pathname]);

    return (
        <AppContainer>
            <Header />
            <Body />
        </AppContainer>
    )
}

export default Home