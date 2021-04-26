import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import * as env_vars from './../../../environments/environment';
import { IAuthError, IAuthSuccess, ICheckData, ICheckResponse, ILoginData, ILoginResponse, IRegistrationData } from './../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  
  
  private url;
  private port;
  constructor(http: HttpClient) { 
    super(http);
    this.url = env_vars.api_url.url;
    this.port = env_vars.api_port.port.toString();
  }

  login(loginData: ILoginData):Promise<ILoginResponse> {
    return this.post(this.url + ":" + this.port + "/login", {
      username: loginData.username,
      password: loginData.password
    })
  }

  register(registrationData: IRegistrationData): Promise<ILoginResponse> {
    return this.post(this.url + ":" + this.port + "/register", {
      username: registrationData.username,
      password: registrationData.password
    })
  }

  logout(): Promise<any> {
    return this.post(this.url + ":" + this.port + "/logout", {})
  }

  checkCode(checkData: ICheckData): Promise<ICheckResponse> {
    return this.get(this.url + ":" + this.port + "check", {
      text: checkData.text,
      language: checkData.language
    })
  }
}
