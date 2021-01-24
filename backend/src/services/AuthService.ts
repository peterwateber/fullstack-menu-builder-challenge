import admin from "../firebase"
import { AuthResponse } from "api-contract"

export class AuthService {
    public static async authenticate(token: string): Promise<AuthResponse> {
        try {
            const user = await admin.auth().verifyIdToken(token, true)
            return {
                uid: user.uid,
            }
        } catch (ex) {
            console.log("Error", ex)
        }
    }
}
