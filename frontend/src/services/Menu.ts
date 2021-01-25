import { Menu, Menus } from "api-contract"
import AsyncAction from "utils/AsyncAuth"

export default class MenuService {
    static async getAll(params: object): Promise<Menus> {
        return await AsyncAction.get("menu", params)
    }

    static async getMenuDetails(id: string): Promise<Menu> {
        return await AsyncAction.get(`menu/${id}`)
    }

    static async createMenu(menu: Omit<Menu, "id">) {
        return await AsyncAction.put("menu", menu)
    }
}
