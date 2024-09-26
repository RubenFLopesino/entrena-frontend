import { AxiosService } from "../axios/axios.service";

export interface MailDTO {
  from: string;
  subject: string;
  body: string;
  to?: string;
}

export class MailService {
  private static _instance: MailService;

  private baseURL = "/send-mail";

  private constructor() {}

  static get instance(): MailService {
    if (!this._instance) {
      this._instance = new MailService();
    }
    return this._instance;
  }

  // If to is undefined we use the admin mail on backend
  async sendMail<T>(
    from: string,
    subject: string,
    body: string,
    to?: string,
  ): Promise<T> {
    try {
      return await AxiosService.put<MailDTO, T>(
        { from, subject, body, to },
        this.baseURL,
      );
    } catch (error) {
      console.error("Error sending mail:", error);
      throw new Error("Error sending mail");
    }
  }
}
