import { Menu, Menus, MenuState } from "api-contract"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import MenuService from "services/Menu"
import { setAuthModal } from "./Auth"

export enum MenuActionType {
    SET_MENU = "set/menu",
    SET_VIEWING = "set/menu/viewing",
    SET_LOADING = "set/menu/loading",
    SET_VIEWING_LOADING = "set/menu/viewing/loading",
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

export const setMenuViewing = (viewing: Menu | null): MenuAction => ({
    type: MenuActionType.SET_VIEWING,
    payload: {
        viewing,
    },
})

export const setMenuLoading = (loading: boolean): MenuAction => ({
    type: MenuActionType.SET_LOADING,
    payload: {
        loading,
    },
})

export const setViewingMenuLoading = (isViewingLoading: boolean): MenuAction => ({
    type: MenuActionType.SET_VIEWING_LOADING,
    payload: {
        isViewingLoading,
    },
})

export const getAllMenu = (params: object): ThunkAction<any, any, any, Action> => {
    return async (dispatch) => {
        try {
            dispatch(setMenuLoading(true))
            const menu = await MenuService.getAll(params)
            // To avoid internal server errors
            dispatch(setMenu(menu))
        } catch (ex) {
            dispatch(
                setAuthModal({
                    modal: {
                        error: true,
                        title: ex.title,
                        message: ex.message,
                        showLogout: !!ex.showLogout,
                    },
                })
            )
        }
        dispatch(setMenuLoading(false))
    }
}

export const getMenuDetails = (
    id: string
): ThunkAction<any, any, any, Action> => {
    return async (dispatch) => {
        dispatch(setViewingMenuLoading(true))
        dispatch(setMenuViewing(null))
        try {
            const menu = await MenuService.getMenuDetails(id)
            // To avoid internal server errors
            dispatch(setMenuViewing(menu))
        } catch (ex) {
            dispatch(
                setAuthModal({
                    modal: {
                        error: true,
                        title: ex.title,
                        message: ex.message,
                        showLogout: !!ex.showLogout,
                    },
                })
            )
        }
        dispatch(setViewingMenuLoading(false))
    }
}
