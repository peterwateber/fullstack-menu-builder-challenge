import { Menu, Menus, MenuState } from "api-contract"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import MenuService from "services/Menu"

export enum MenuActionType {
    SET_MENU = "set/menu",
    SET_VIEWING = "set/menu/viewing",
}

export interface MenuAction {
    type: MenuActionType
    payload: Partial<MenuState>
}

/**
 * Action Creator
 */
export const setMenu = (menu: Menus): MenuAction => ({
    type: MenuActionType.SET_MENU,
    payload: {
        menu,
    },
})

const setMenuViewing = (viewing: Menu): MenuAction => ({
    type: MenuActionType.SET_VIEWING,
    payload: {
        viewing,
    },
})

export const getAllMenu = (): ThunkAction<any, any, any, Action> => {
    return async (dispatch) => {
        const menu = await MenuService.getAll()
        // To avoid internal server errors
        dispatch(setMenu(menu))
    }
}

export const getMenuDetails = (
    id: string
): ThunkAction<any, any, any, Action> => {
    return async (dispatch) => {
        const menu = await MenuService.getMenuDetails(id)
        // To avoid internal server errors
        dispatch(setMenuViewing(menu))
    }
}
