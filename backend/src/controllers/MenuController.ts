import {
    GetAllMenuRequest,
    Menu,
    Menus,
} from "api-contract"
import Koa from "koa"
import { tagsAll } from "koa-swagger-decorator"
import MenuService from "../services/MenuService"
import { Controller, Get, Put, Request, Route, SuccessResponse } from "tsoa"
import { sanitizeInput } from "../utils/SanitizeInput"
import { AuthService } from "../services/AuthService"

@tagsAll(["menu"])
@Route("menu")
export class MenuController extends Controller {
    constructor(private readonly menuService = new MenuService()) {
        super()
    }

    @Get("/")
    public async getAll(@Request() request: Koa.Request): Promise<Menus> {
        const params: GetAllMenuRequest = request.query
        return await this.menuService.getAll(params)
    }

    @Get("{menuId}")
    public async getOrderDetails(menuId: string): Promise<Menu | {}> {
        return await this.menuService.details(menuId)
    }

    @Put("/")
    @SuccessResponse(204)
    public async save(@Request() request: Koa.Request) {
        try {
            await AuthService.authenticate(request.header?.token)
            const {
                name,
                price,
                description,
                category,
                dish,
                image,
            } = sanitizeInput({
                name: request.body.name,
                price: request.body.price,
                description: request.body.description,
                category: request.body.category,
                dish: request.body.dish,
                image: request.body.image,
            })
            return await this.menuService.save({
                name,
                price,
                description,
                category,
                dish,
                image,
                other: request.body.other || "",
            })
        } catch (ex) {
            this.setStatus(ex.code)
            if (ex.code === 503 || ex.code === 401) {
                return ex
            } else {
                return {
                    error: true,
                    title: "Validation Error",
                    message: ex.message,
                }
            }
        }
    }
}
