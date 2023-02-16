import { IUser } from "./IUser";

export interface AuthResponse {
    accesssToken: string;
    refreshToken: string;
    user: IUser
}