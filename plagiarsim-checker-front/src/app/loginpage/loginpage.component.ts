import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { ILoginData, IAuthError, IAuthSuccess } from '../shared/models/models';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  public form_username = "";
  public form_password = "";

  constructor(private provider: ProviderService) { 

  }

  ngOnInit(): void {
    const token = localStorage.getItem('antiplagiarismtoken');
  }

  loginToAccount() {
    let loginData: ILoginData = {
      username: this.form_username,
      password: this.form_password
    }

    this.provider.login(loginData).then(res => {
      
    })
  }

}
