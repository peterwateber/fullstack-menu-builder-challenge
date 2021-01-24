import { ApiError } from "./GeneralContract";
export interface LoginRequest {
    token: string;
}
export interface AuthResponse {
    uid: string;
}
/**
 * Frontend state
 */
export interface UserState {
    email: string | undefined;
    token: string | undefined;
}
export interface AuthState {
    loading: boolean;
    modal: ApiError;
    user: UserState;
}
