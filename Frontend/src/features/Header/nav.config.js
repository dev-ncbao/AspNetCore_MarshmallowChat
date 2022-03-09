import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUserGroup } from '@fortawesome/free-solid-svg-icons';

export const navItems = [
    {
        name: 'Nhắn tin',
        path: 'chat',
        Icon: <FontAwesomeIcon icon={faComment}/>
    },
    {
        name: 'Liên hệ',
        path: 'contact',
        Icon: <FontAwesomeIcon icon={faUserGroup}/>
    }
]