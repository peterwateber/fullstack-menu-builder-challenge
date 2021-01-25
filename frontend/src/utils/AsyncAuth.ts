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
            token: authData.token,
        }
    }

    static showAuthError() {
        throw Object.assign(
            new Error("Authentication is required. You will need to login"),
            {
                error: true,
                title: "Authentication error.",
                showLogout: true,
            }
        )
    }

    static showServerError(err: AxiosError) {
        throw Object.assign(new Error(err.response?.data.message), {
            error: true,
            title: err.response?.data.title,
            showLogout: false,
        })
    }

    static showGeneralError() {
        throw Object.assign(new Error("Please try again later."), {
            error: true,
            title: "Oops! An error occured.",
            showLogout: false,
        })
    }

    static async get(url: string, parameter?: object): Promise<any> {
        AsyncAction._setHeader()
        try {
            const response: AxiosResponse = await axios.get(
                API_URL.concat(url),
                {
                    params: parameter,
                }
            )
            return response.data
        } catch (ex) {
            if (ex.response.status === 401) {
                AsyncAction.showAuthError()
            } else if (ex.response.status === 500) {
                AsyncAction.showGeneralError()
            } else {
                AsyncAction.showServerError(ex)
            }
        }
    }

    static async post(url: string, parameter?: object): Promise<any> {
        AsyncAction._setHeader()
        try {
            const response: AxiosResponse = await axios.post(
                API_URL.concat(url),
                parameter
            )
            return response.data
        } catch (ex) {
            if (ex.response.status === 401) {
                AsyncAction.showAuthError()
            } else if (ex.response.status === 500) {
                AsyncAction.showGeneralError()
            } else {
                AsyncAction.showServerError(ex)
            }
        }
    }

    static async put(url: string, parameter?: object): Promise<any> {
        AsyncAction._setHeader()
        try {
            const response: AxiosResponse = await axios.put(
                API_URL.concat(url),
                parameter
            )
            return response.data
        } catch (ex) {
            if (ex.response.status === 401) {
                AsyncAction.showAuthError()
            } else if (ex.response.status === 500) {
                AsyncAction.showGeneralError()
            } else {
                AsyncAction.showServerError(ex)
            }
        }
    }
}
