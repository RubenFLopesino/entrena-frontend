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
  private static _isAuthenticated: boolean = false;

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
        const decodedToken = jwtDecode<JwtPayload>(response.token);
        const expiresIn = decodedToken.exp! - Math.floor(Date.now() / 1000);
        StorageService.setItem(
          process.env["REACT_APP_BASE_TOKEN_KEY"] as string,
          token,
        );
        LoginService._isAuthenticated = true;
        this.emit(emitterKey);
        this.setSessionTime(expiresIn);
      }

      return response;
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  }

  logout() {
    StorageService.removeItem(
      process.env["REACT_APP_BASE_TOKEN_KEY"] as string,
    );
    LoginService._isAuthenticated = false;
    this.emit(emitterKey);
  }

  static get instance(): LoginService {
    if (!this._instance) this._instance = new LoginService();
    return this._instance;
  }

  get isAuthenticated(): boolean {
    return LoginService._isAuthenticated;
  }

  private setSessionTime(expiresIn: number) {
    setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }
}
