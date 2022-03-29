import { faUserGroup, faUserPlus, faUserClock } from "@fortawesome/free-solid-svg-icons";

const initState = {
    nav: {
        item: ['Bạn bè', 'Nhóm chat']
    },
    subNav: {
        item: ['Danh sách bạn bè', 'Thêm bạn mới', 'Lời mời kết bạn'],
        icon: [faUserGroup, faUserPlus, faUserClock]
    }
}

const reducer = (state, action) => {
    switch (action) {
        default: throw new Error('Invalid action');
    }
}

export default reducer;
export { initState };