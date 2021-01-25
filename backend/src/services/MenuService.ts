import { Category, Dish, GetAllMenuRequest, Menu, Menus } from "api-contract"
import admin from "../firebase"

export default class MenuService {
    constructor(
        private readonly query: admin.firestore.Firestore = admin.firestore()
    ) {}

    async getAll(params: GetAllMenuRequest): Promise<Menus> {
        const query = this.query.collection("menu")
        let snapshot = await query.get()
        if (Boolean(Object.values(params).length)) {
            snapshot = await query
                .where(params.by.toLocaleLowerCase(), "==", params.value)
                .get()
        }
        return {
            total: snapshot.size,
            items: snapshot.docs.map((s) => ({
                ...s.data(),
                id: s.id,
            })) as Menu[],
        }
    }

    async save(menu: Omit<Menu, "id">) {
        try {
            const created = await this.query.collection("menu").add(menu)
            return {
                id: created.id,
            }
        } catch {
            throw {
                code: 503,
                error: true,
                title: "Oops! An error occured.",
                message: "We're sorry. Please try again later.",
            }
        }
    }

    async details(uid: string): Promise<Menu | {}> {
        const snapshot = await this.query.collection("menu").doc(uid).get()
        return typeof snapshot.data() !== "undefined" ? snapshot.data() : {}
    }
}
