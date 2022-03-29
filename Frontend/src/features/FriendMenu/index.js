import { useOutletContext } from 'react-router-dom';
//
import { NavSquare } from './../../components';

function FriendMenu() {
    const context = useOutletContext();
    return (
        <NavSquare
            items={context.item}
            icons={context.icon}
        />
    )
}

export default FriendMenu
