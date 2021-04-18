import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import * as env_vars from './../../../environments/environment';
import { ILoginData } from './../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  private url = env_vars.api_url

  constructor(http: HttpClient) { 
    super(http);
  }

  login(loginData: ILoginData):Promise<any> {
    let url = env_vars.api_url.url;
    let port = env_vars.api_port.port.toString;
    // console.log(typeof url);
    // console.log(typeof port);
    // console.log(url + port.toString());
    return this.post(url + ":" + port + "/login", {
      username: loginData.username,
      password: loginData.password
    })
  }
}
