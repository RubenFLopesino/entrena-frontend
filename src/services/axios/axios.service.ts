import axios, { AxiosInstance } from "axios";
import { StorageService } from "../storage/storage.service";

export class AxiosService {
  private static _axios: AxiosInstance;

  static async post<T, R>(data: T, url: string): Promise<R> {
    try {
      const response = await this.instance.post<R>(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error in POST request to ${url}:`, error);
      throw error;
    }
  }

  static async put<T, R>(data: T, url: string): Promise<R> {
    try {
      const response = await this.instance.put<R>(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error in PUT request to ${url}:`, error);
      throw error;
    }
  }

  static async get<R>(url: string): Promise<R> {
    try {
      const response = await this.instance.get<R>(url);
      return response.data;
    } catch (error) {
      console.error(`Error in GET request to ${url}:`, error);
      throw error;
    }
  }

  private static get instance(): AxiosInstance {
    if (!this._axios) {
      this._axios = this.createAxiosInstance();
    }
    return this._axios;
  }

  private static createAxiosInstance(): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL: process.env["REACT_APP_BASE_API_URL"],
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        const token = StorageService.getItem(
          process.env["REACT_APP_BASE_TOKEN_KEY"] as string,
        );
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error("Error in request interceptor:", error);
        return Promise.reject(error);
      },
    );

    return axiosInstance;
  }
}
