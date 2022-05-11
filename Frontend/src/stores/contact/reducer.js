import { faUserGroup, faUserPlus, faUserClock, faUsers } from "@fortawesome/free-solid-svg-icons"
//
import { FriendListContent, FriendAdditionContent, FriendInvitationContent, GroupListContent, GroupAddContent } from './../../features'
import * as types from './types'

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
    const newState = {...state}
    switch (action.type) {
        case types.SET_NAV_CHECKED:
            const checked = action.payload.checked
            if (newState.nav.checked !== checked) {
                newState.nav.checked = checked
                newState.menu.forEach((value) => {
                    value.checked = 0
                })
                return newState
            }
            return state
        case types.SET_MENU_CHECKED:
            const navChecked = newState.nav.checked
            const menuChecked = action.payload.checked
            if (newState.menu[navChecked].checked !== menuChecked) {
                newState.menu[navChecked].checked = menuChecked
                return newState
            }
            return state
        default: throw new Error('Invalid action')
    }
}

export default reducer
export { initState }