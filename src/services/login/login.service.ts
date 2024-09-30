import EventEmitter from "events";
import { AxiosService } from "../axios/axios.service";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { StorageService } from "../storage/storage.service";

interface LoginResponse {
  status: number;
  token: string;
}

export const emitterKey = "isAuthenticated";

export class LoginService extends EventEmitter {
  private static _instance: LoginService;

  private baseURL = "/login";

  private constructor() {
    super();
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await AxiosService.post<
        { email: string; password: string },
        LoginResponse
      >({ email, password }, this.baseURL);
      if (response.status === 200) {
        const { token } = response;
        StorageService.setItem(
          process.env["REACT_APP_BASE_TOKEN_KEY"] as string,
          token
        );
        this.emit(emitterKey);
      }
      return response;
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  }

  logout() {
    StorageService.removeItem(
      process.env["REACT_APP_BASE_TOKEN_KEY"] as string
    );
    this.emit(emitterKey);
  }

  static get instance(): LoginService {
    if (!this._instance) this._instance = new LoginService();
    return this._instance;
  }

  get isAuthenticated(): boolean {
    const token = StorageService.getItem(
      process.env["REACT_APP_BASE_TOKEN_KEY"] as string
    );
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      console.log(
        decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()
      );
      if (decodedToken.exp && decodedToken.exp * 1000 > new Date().getTime()) {
        this.setSessionTime(decodedToken.exp! - Math.floor(Date.now() / 1000));
        return true;
      }
      this.logout();
      return false;
    }
    return false;
  }

  private setSessionTime(expiresIn: number) {
    setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }
}
