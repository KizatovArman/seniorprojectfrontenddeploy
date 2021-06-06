import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ProviderService } from '../shared/services/provider.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILogoutSuccess } from '../shared/models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn;
  private token = "";
  constructor(private authService: AuthService,
    private providerService: ProviderService) { 
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    const helper = new JwtHelperService();
    if(this.token && !helper.isTokenExpired(this.token)) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
      this.authService.clearStorage();
    }
  }

  async logout(): Promise<void> {
    this.authService.clearStorage();
    let response = await this.providerService.logout(this.token);
    if(response.ok) {
      let logoutResponse = await response.json();
      if(logoutResponse.success) {
        window.alert(logoutResponse.msg);
      }
      else {
        window.alert("Error occured during process! Please try again later!");
      }
    }
    else {
      window.alert("Error occured during process! Please try again later!");
    }
    
    // this.providerService.logout(this.token).then(res => {
    //   if(res) {
    //     window.alert("You have successfully signed out from our system!");
    //   }
    //   else {
    //     window.alert("Error occured during the process! Please try again later!");
    //   }
    // })
    // this.loggedIn = false;
    location.reload();
  }

}
