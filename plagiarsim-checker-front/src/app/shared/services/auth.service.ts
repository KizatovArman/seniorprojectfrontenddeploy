import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private helper = new JwtHelperService();

  constructor() { }

  getUserDetails() { 
    return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null; 
  } 
  
  setDataInLocalStorage(variableName, data) { 
      localStorage.setItem(variableName, data); 
  } 

  getToken() { 
      return localStorage.getItem('antiplagiarismtoken'); 
  } 

  clearStorage() { 
      localStorage.clear(); 
  } 

  
}
