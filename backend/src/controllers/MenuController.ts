import { Category, Dish, Menu } from "api-contract"
import Koa from "koa"
import { tagsAll } from "koa-swagger-decorator"
import { Controller, Get, Request, Route, SuccessResponse } from "tsoa"
import { sanitizeInput } from "../utils/SanitizeInput"

@tagsAll(["menu"])
@Route("menu")
export class MenuController extends Controller {
    constructor() {
        super()
    }

    @Get("/")
    public async getAll(@Request() request: Koa.Request): Promise<any> {
        return {
            total: 3,
            items: [
                {
                    id: "123",
                    name: "Menu name",
                    price: 100.15,
                    description: "Some description",
                    category: Category.BREAKFAST,
                    dish: Dish.ASIAN,
                    picture: "https://d3qvqlc701gzhm.cloudfront.net/full/dc73bfd2623912fd8b080f69d623fa66d92dc6e513d2feb1d727dc6667337f84.jpg",
                    other: "",
                },
                {
                    id: "123",
                    name: "Menu name",
                    price: 100.15,
                    description: "Some description",
                    category: Category.BREAKFAST,
                    dish: Dish.ASIAN,
                    picture: "https://d3qvqlc701gzhm.cloudfront.net/full/dc73bfd2623912fd8b080f69d623fa66d92dc6e513d2feb1d727dc6667337f84.jpg",
                    other: "",
                },
                {
                    id: "123",
                    name: "Menu name",
                    price: 100.15,
                    description: "Some description",
                    category: Category.BREAKFAST,
                    dish: Dish.ASIAN,
                    picture: "https://d3qvqlc701gzhm.cloudfront.net/full/dc73bfd2623912fd8b080f69d623fa66d92dc6e513d2feb1d727dc6667337f84.jpg",
                    other: "",
                },
            ],
        }
    }

    @Get("{menuId}")
    public async getOrderDetails(menuId: string): Promise<Menu> {
        return {
            id: menuId,
            name: "Menu name",
            price: 100.15,
            description: "Some description",
            category: Category.BREAKFAST,
            dish: Dish.ASIAN,
            image: "https://d3qvqlc701gzhm.cloudfront.net/full/dc73bfd2623912fd8b080f69d623fa66d92dc6e513d2feb1d727dc6667337f84.jpg",
            other: "",
        }
    }
}
