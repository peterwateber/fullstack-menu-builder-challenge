import { Menu, Menus } from "api-contract"
import AsyncAction from "utils/AsyncAuth"

export default class MenuService {
    static async getAll(): Promise<Menus> {
        return await AsyncAction.get("menu")
    }

    static async getMenuDetails(id: string): Promise<Menu> {
        return await AsyncAction.get(`menu/${id}`)
    }
}
