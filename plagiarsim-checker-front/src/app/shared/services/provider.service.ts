import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import * as env_vars from './../../../environments/environment';
import { GoogleToken, IAuthError, IAuthSuccess, ICheckData, ICheckResponse, IGoogleCloud, IGoogleCloudSuccess, ILoginData, ILoginResponse, ILogoutSuccess, IRegistrationData } from './../models/models';

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
    return this.post(this.url + ":" + this.port + "/api/signin/", {
      username: loginData.username,
      password: loginData.password
    })
  }

  //http://localhost:3000/api/signup/
  register(registrationData: IRegistrationData): Promise<IAuthSuccess> {
    return this.post(this.url + ":" + this.port + "/api/signup/", {
      username: registrationData.username,
      password: registrationData.password
    })
  }
  
  logout(token: string): Promise<Response> {
    let url = encodeURI(this.url + ":" + this.port + "/api/signout/");
    let req = fetch(url, {
      headers: {
        'Authorization': token
      }
    })
    return req;
  }

  checkCode(checkData: ICheckData, token: string): Promise<Response> {
    let url = encodeURI(this.url + ":" + this.port + "/api/check");
    let req = fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(checkData)
    })
    return req
  }

  checkWithML(checkData: IGoogleCloud, googleToken: GoogleToken): Promise<IGoogleCloudSuccess> {            
    return this.post("https://europe-west2-ml.clients6.google.com/v1/projects/hopeful-canto-266101/models/salamaleikum/versions/anime123456:predict?access_token="+googleToken.token, {
      instances: checkData.instances    
    })
  }
}
