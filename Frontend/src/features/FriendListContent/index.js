import { useRef } from 'react'
//
import { Search, FriendContainer } from './../../components';
import styles from './FriendListContent.module.css';

function FriendListContent() {
    const containerRef = useRef();
    const friends = [
        { id: 1, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 2, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 3, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 4, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 5, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 6, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 7, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 8, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 9, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 10, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
        { id: 11, name: 'Nguyễn Chí Bảo', description: '@ncb1403' },
    ]
    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.searchContainer}>
                <Search placeholder='Tìm kiếm bạn bè' />
            </div>
            <div className={styles.friendsContainer}>
                <div className={styles.friendsWrapper}>
                    {
                        friends.map((friend, index) => {
                            return (
                                <FriendContainer key={index} friend={friend} containerRef={containerRef}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FriendListContent
