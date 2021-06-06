import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updater',
  templateUrl: './updater.component.html',
  styleUrls: ['./updater.component.css']
})
export class UpdaterComponent implements OnInit {

  form:FormGroup;

  constructor(private _authService: AuthService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      token: ['', Validators.minLength(1)]
    });
  }

  updateToken() {
    let formValue = this.form.value;
    localStorage.removeItem("antiplagiarismgoogletoken");
    this._authService.setDataInLocalStorage("antiplagiarismgoogletoken", formValue.token);
  }



}
