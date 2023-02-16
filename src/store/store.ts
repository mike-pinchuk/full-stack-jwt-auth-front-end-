import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/auth.response";
import { IUser } from "../models/response/IUser";
import { AuthService } from "../services/auth.service";

export default class Store {
    user = {} as IUser;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accesssToken);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accesssToken);
            this.setUser({} as IUser);
        } catch (error) {
            console.log(error)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token')
        } catch (error) {

        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            console.log('CHECK AUTH', response)
            localStorage.setItem('token', response.data.accesssToken);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoading(false);
        }
    }

}