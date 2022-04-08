import { faUserGroup, faUserPlus, faUserClock, faUsers } from "@fortawesome/free-solid-svg-icons";
//
import { FriendListContent, FriendAdditionContent, FriendInvitationContent, GroupListContent, GroupAddContent } from './../../features';
import * as types from './types';

const initState = {
    nav: {
        items: ['Bạn bè', 'Nhóm chat'],
        checked: 0
    },
    menu: [
        { // friend
            items: ['Danh sách bạn bè', 'Thêm bạn mới', 'Lời mời kết bạn'],
            icons: [faUserGroup, faUserPlus, faUserClock],
            components: [<FriendListContent />, <FriendAdditionContent />, <FriendInvitationContent />],
            checked: 0
        },
        { // group
            items: ['Danh sách nhóm chat', 'Tạo nhóm'],
            icons: [faUsers, faUserPlus],
            components: [<GroupListContent />, <GroupAddContent />],
            checked: 0
        }
    ]
}

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    let next;
    switch (type) {
        case types.SET_NAV_CHECKED:
            if (state.nav.checked !== payload.checked) {
                next = { ...state };
                next.nav.checked = payload.checked;
                next.menu.forEach((value) => {
                    value.checked = 0;
                });
                return next;
            }
            return state;
        case types.SET_MENU_CHECKED:
            if (state.menu[state.nav.checked].checked !== payload.checked) {
                next = { ...state };
                next.menu[next.nav.checked].checked = payload.checked;
                return next;
            }
            return state
        default: throw new Error('Invalid action');
    }
}

export default reducer;
export { initState };