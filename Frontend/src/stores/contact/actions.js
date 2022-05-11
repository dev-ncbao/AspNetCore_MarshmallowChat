import * as types from './types'

export const setNavChecked = (payload) => ({
    type: types.SET_NAV_CHECKED,
    payload
})

export const setMenuChecked = (payload) => ({
    type: types.SET_MENU_CHECKED,
    payload
})