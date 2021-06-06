import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleToken, IBackCheckResponse, ICheckData, IGoogleCloud } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from '../shared/services/auth.service';
import { MachinelearningService } from '../shared/service/machinelearning.service';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.css']
})
export class CheckerComponent implements OnInit {

  form:FormGroup;
  public fileString;
  public fileExtension = "";
  private token = "";
  public mlResult = "";
  public backResult = "";
  public checkwithMLbool = false;
  public successfullyCheckedwithBack = false;
  public successfullyCheckedwithML = false;
  public isPlagiarisedByML = false;
  public checkByJackard = 0;
  public checkByRabinKarp = [0];
  constructor(public fb: FormBuilder,
              public provider: ProviderService,
              private _authService: AuthService,
              private machineLearningService: MachinelearningService) { }

  ngOnInit(): void {
    const jwtServiceHelper = new JwtHelperService();
    this.token = this._authService.getToken();
    // console.log(jwtServiceHelper.decodeToken(this.token));
    this.fileString = "";
    this.mlResult = "";
    this.fileExtension = "";
    this.checkwithMLbool = false;
    this.successfullyCheckedwithBack = false;
    this.successfullyCheckedwithML = false;
    this.isPlagiarisedByML = false;
    this.checkByJackard = 0;
    this.checkByRabinKarp = [0];
    this.form = this.fb.group({      
      inputFile: ['', Validators.required]
    });
  }

  onFileSelect($event):void {
    this.readFile($event.target);
  }

  readFile(inputFile: any): void {
    var file: File = inputFile.files[0];
    if(this.validateExtension(this.getExtension(file.name))) {
      this.fileExtension = this.getExtension(file.name);
      if(this.fileExtension === "cpp") {
        this.checkwithMLbool = true;
      }
      else {
        this.checkwithMLbool = false;
      }
      var myReader: FileReader = new FileReader();
      var textResult: string | ArrayBuffer;
      myReader.onloadend = () => {
        textResult = myReader.result;
        this.fileString = textResult;
      }
      myReader.readAsText(file);
    }  
    else {
      window.alert("Please choose appropriate file extension: cpp, java, py! And try again.");
    }
    // this.fileString = textResult;
    // console.log(this.fileString);
  }

  async checkForPlagiarism() {
    // let formValues = this.form.value;
    let checkData:ICheckData = {
      language: this.fileExtension,
      text: this.fileString
    } 
    // console.log(this.fileString);
    let token = this._authService.getToken();
    // console.log(this.fileExtension);
    // console.log(this.fileString);
    let req = await this.provider.checkCode(checkData,token);
    if(req.ok) {    
      let jsonResponse:IBackCheckResponse = await req.json();
      // console.log(jsonResponse);
      // console.log(jsonResponse.result)      
      this.checkByJackard = (Math.floor((jsonResponse.result*100)) <= 100) ? Math.floor((jsonResponse.result*100)) : 100;
      // console.log(this.checkByJackard);    
      setTimeout(() => { this.successfullyCheckedwithBack = true;}, 2000);
    }
    else {
      window.alert("Error occured during process! Please try again!");
    }
  }

  getExtension(fileName: string) {
    return fileName.split('.').pop();
  }

  validateExtension(extension: string):boolean {
    return ((extension === "cpp" || extension === "java" || extension === "py")) ? true : false;
  }

  again() {
    location.reload();
  }

  checkWithML() {
    let checkData: IGoogleCloud = this.machineLearningService.prepareCodeForModel(this.fileString);
    let googleToken: GoogleToken = {
      token: localStorage.getItem("antiplagiarismgoogletoken")
    }
    this.provider.checkWithML(checkData, googleToken).then(res => {
      if(res.predictions.length > 0) {
        // console.log(res);
        // console.log(res.predictions[0]);
        if(res.predictions[0] === " 0") {
          this.successfullyCheckedwithML = true;
          this.mlResult = "Not Plagiarised";
          this.isPlagiarisedByML = false;
          // console.log(res)
        }
        else if(res.predictions[0] === " 1") {
          this.successfullyCheckedwithML = true;
          this.mlResult = "Plagiarised";
          this.isPlagiarisedByML = true;
          // console.log(res)
        }
      }
      else {
        this.successfullyCheckedwithML = false;
        this.mlResult = "";
        window.alert("Error occured during process! Please try again!");      
      }
    })
  }
}
