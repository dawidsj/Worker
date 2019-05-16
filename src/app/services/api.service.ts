import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginDto} from '../DTO/repositories/login.dto';
import {RegisterDto} from '../DTO/repositories/register.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private httpClient: HttpClient ) { }
  public login(data: LoginDto) {
   return this.httpClient.post(environment.APIEndpoint + 'api/login', data);
  }
  public register(data: RegisterDto) {
    return this.httpClient.post( environment.APIEndpoint + 'api/register', data);
  }
}
