/**
 * Menu
 */
export enum Category {
    BREAKFAST = "Breakfast",
    LUNCH = "Lunch",
    DINNER = "Dinner",
}
export enum Dish {
    ASIAN = "Asian",
    Italian = "Italian",
}
export interface Menu {
    id: string
    name: string
    price: number
    description: string
    category: Category
    dish: Dish
    image: string
    other?: string
}
export interface Menus {
    total: number
    items: Menu[]
}
/**
 * Frontend State
 */
export interface MenuState {
    menu: Menus
    viewing: Menu | null
    loading: boolean
    isViewingLoading: boolean
}
/**
 * Request
 */
export enum GetAllMenuRequestBy {
    Category="Category",
    Dish="Dish"
}
export interface GetAllMenuRequest {
    by: GetAllMenuRequestBy
    value: string
}