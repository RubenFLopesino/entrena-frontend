import { AxiosService } from "../axios/axios.service";

export interface UserDTO {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
}

export class UsersService {
  private static _instance: UsersService;

  private baseURL = "/users";

  private constructor() {}

  static get instance(): UsersService {
    if (!this._instance) {
      this._instance = new UsersService();
    }
    return this._instance;
  }

  async getById(id: string): Promise<UserDTO> {
    try {
      const response = await AxiosService.get<UserDTO>(`${this.baseURL}/${id}`);
      return {
        ...response,
        age: this.calculateAge(new Date(response.birthDate)),
      };
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw new Error("Error fetching user data");
    }
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
