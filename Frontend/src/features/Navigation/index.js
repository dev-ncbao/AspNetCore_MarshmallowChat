import { NavItem } from './../../components';

function Navigation({ items }) {
    return (
        items.map((item, index) => {
            return <NavItem key={index} path={item.path}>{item.icon}</NavItem>
        })
    )
}

export default Navigation
