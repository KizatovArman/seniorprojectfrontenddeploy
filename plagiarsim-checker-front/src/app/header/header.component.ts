import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn;
  constructor(private authService: AuthService) { 
    this.loggedIn = false;
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if(token) {
      this.loggedIn = true;
    }
  }

  logout(): void {
    this.authService.clearStorage();
    this.loggedIn = false;
  }

}
