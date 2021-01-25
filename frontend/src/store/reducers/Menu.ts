import { MenuState } from "api-contract"
import { MenuAction, MenuActionType } from "store/actions/Menu"

const INITIAL_STATE: MenuState = {
    menu: {
        total: 0,
        items: [],
    },
    viewing: null,
    loading: true,
    isViewingLoading: true,
}

const MenuReducer = (state = INITIAL_STATE, action: MenuAction): MenuState => {
    switch (action.type) {
        case MenuActionType.SET_MENU:
            return {
                ...state,
                loading: false,
                ...action.payload,
            }
        case MenuActionType.SET_VIEWING:
            return {
                ...state,
                ...action.payload,
            }
        case MenuActionType.SET_LOADING:
            return {
                ...state,
                ...action.payload,
            }
        case MenuActionType.SET_VIEWING_LOADING:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}

export default MenuReducer
