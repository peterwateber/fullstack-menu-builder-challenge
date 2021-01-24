import { AuthState, MenuState } from "api-contract"
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import AuthReducer from "./reducers/Auth"
import MenuReducer from "./reducers/Menu"

export interface RootState {
    auth: AuthState
    menu: MenuState
}

const staticReducer = {
    auth: AuthReducer,
    menu: MenuReducer,
}

const rootReducer = combineReducers<RootState>(staticReducer)

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
