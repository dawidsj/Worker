import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginDto} from '../DTO/repositories/login.dto';
import {RegisterDto} from '../DTO/repositories/register.dto';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }
  public login(data: LoginDto) {
   return this.httpClient.post(environment.APIEndpoint + 'api/login', data);
  }
  public register(data: RegisterDto) {
    return this.httpClient.post( environment.APIEndpoint + 'api/register', data);
  }
  public getUser(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    });

    return this.httpClient.post(environment.APIEndpoint + 'api/user', null, {headers: httpHeaders, observe: 'response'});
  }
  public getOwnerBoards(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    });

    return this.httpClient.post(environment.APIEndpoint + 'api/user/boards/owner', null, {headers: httpHeaders, observe: 'response'});
  }
}
