import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IRegistrationData } from '../shared/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-registercomponent',
  templateUrl: './registercomponent.component.html',
  styleUrls: ['./registercomponent.component.css']
})
export class RegistercomponentComponent implements OnInit {

  form:FormGroup
  constructor(private provider: ProviderService,
              private authService: AuthService,
              public fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email:['', Validators.required, Validators.email],
      password:['', Validators.required, Validators.minLength(8)] 
    });
  }

  registerToSite() {
    let formValues = this.form.value;

    let registerData: IRegistrationData = {
      username: formValues.email,
      password: formValues.password
    }

    this.provider.register(registerData).then(res => {
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
