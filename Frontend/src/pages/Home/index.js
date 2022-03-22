import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//
import { Header } from './../../features';
import { Body, AppContainer } from './../../containers';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // if(document.cookie.includes('UserId'))
        //     navigate('chat');
        // else
        //     navigate('login');
    }, [location]);
    return (
        <AppContainer>
            <Header />
            <Body />
        </AppContainer>
    )
}

export default Home