export class StorageService {
  static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  static setItem(key: string, data: string): void {
    return localStorage.setItem(key, data);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
