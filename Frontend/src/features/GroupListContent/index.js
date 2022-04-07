import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
//
import { Search, ContactCard } from './../../components';
import styles from './GroupListContent.module.css';

function GroupListContent() {
    return (
        <>
            <Search placeholder='Tìm kiếm nhóm chat'/>
            <div className={styles.container}>
                <ContactCard
                    info={{ name: 'Nguyễn Chí Bảo', description: '@ncb1403' }} buttonLeft={{ label: 'Nhắn tin' }} buttonRight={{ icon: faEllipsis }}
                />
                <ContactCard
                    info={{ name: 'Nguyễn Chí Bảo', description: '@ncb1403' }} buttonLeft={{ label: 'Nhắn tin' }} buttonRight={{ icon: faEllipsis }}
                />
                <ContactCard
                    info={{ name: 'Nguyễn Chí Bảo', description: '@ncb1403' }} buttonLeft={{ label: 'Nhắn tin' }} buttonRight={{ icon: faEllipsis }}
                />
                <ContactCard
                    info={{ name: 'Nguyễn Chí Bảo', description: '@ncb1403' }} buttonLeft={{ label: 'Nhắn tin' }} buttonRight={{ icon: faEllipsis }}
                />
                <ContactCard
                    info={{ name: 'Nguyễn Chí Bảo', description: '@ncb1403' }} buttonLeft={{ label: 'Nhắn tin' }} buttonRight={{ icon: faEllipsis }}
                />
                <ContactCard
                    info={{ name: 'Nguyễn Chí Bảo', description: '@ncb1403' }} buttonLeft={{ label: 'Nhắn tin' }} buttonRight={{ icon: faEllipsis }}
                />
            </div>
        </>
    )
}

export default GroupListContent
