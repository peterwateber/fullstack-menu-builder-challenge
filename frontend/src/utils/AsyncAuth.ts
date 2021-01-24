import axios, { AxiosError, AxiosResponse } from "axios"
import { AuthData } from "contexts/AuthProvider"

const API_URL = "/api/v1/"

export default class AsyncAction {
    private static _setHeader() {
        const authData: AuthData = JSON.parse(
            window.localStorage.getItem("authData") || "{}"
        )
        axios.defaults.headers = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            token: authData.token
        }
    }

    static showAuthError(err: Error) {
        return {
            ...err,
            error: true,
            title: "Authentication error.",
            message: "Authentication is required. You will need to login.",
        }
    }

    static showServerError(err: AxiosError) {
        return {
            ...err,
            error: true,
            title: err.response?.data.title,
            message: err.response?.data.message,
        }
    }

    static async get(
        url: string,
        parameter?: object
    ): Promise<any> {
        AsyncAction._setHeader()
        try {
            const response: AxiosResponse = await axios.get(
                API_URL.concat(url),
                parameter
            )
            return response.data
        } catch (ex) {
            return AsyncAction.showAuthError(ex)
        }
    }

    static async post(
        url: string,
        parameter?: object
    ): Promise<any> {
        AsyncAction._setHeader()
        try {
            const response: AxiosResponse = await axios.post(
                API_URL.concat(url),
                parameter
            )
            return response.data
        } catch (ex) {
            if (ex.response.status === 401) {
                return AsyncAction.showAuthError(ex)
            } else {
                // mostly validation error
                return AsyncAction.showServerError(ex)
            }
        }
    }

    static async put(
        url: string,
        parameter?: object
    ): Promise<any> {
        AsyncAction._setHeader()
        try {
            const response: AxiosResponse = await axios.put(
                API_URL.concat(url),
                parameter
            )
            return response.data
        } catch (ex) {
            if (ex.response.status === 401) {
                return AsyncAction.showAuthError(ex)
            } else {
                // mostly validation error
                return AsyncAction.showServerError(ex)
            }
        }
    }
}
