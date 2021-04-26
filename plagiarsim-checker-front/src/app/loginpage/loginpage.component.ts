import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { ILoginData, IAuthError, IAuthSuccess } from '../shared/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  
  form:FormGroup; 
  // public loginResponse;

  constructor(private provider: ProviderService,
              private authService: AuthService,
              public fb: FormBuilder) {               
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(8)]
    });
    // const token = this.authService.getToken();
    // if(token.length > 0) {
      
    // }
  }

  loginToAccount() {
    let formValue = this.form.value;
    
    let loginData: ILoginData = {
      username: formValue.email,
      password: formValue.password
    }

    this.provider.login(loginData).then(res => {
      console.log(formValue);
      if(res.token.length > 0) {
        this.authService.setDataInLocalStorage("antiplagiarismtoken", res.token);
        this.authService.setDataInLocalStorage("antiplagiarismuserId", res._id);
        this.authService.setDataInLocalStorage("antiplagiarismEmail", res.email);
      } else {
        window.alert(res.message);
      }              
    })
  }

}
