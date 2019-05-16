import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor() {
  }
  readonly tokenName = 'token';

  public getToken(): string {
    return localStorage.getItem(this.tokenName);
  }
  public setToken(token: string) {
    localStorage.setItem(this.tokenName, token);
  }
  public removeToken(): void {
    localStorage.removeItem(this.tokenName);
  }
}
