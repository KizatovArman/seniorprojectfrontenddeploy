import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICheckData } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.css']
})
export class CheckerComponent implements OnInit {

  form:FormGroup
  public fileString;
  constructor(public fb: FormBuilder,
              public provider: ProviderService) { }

  ngOnInit(): void {
    this.fileString = "";
    this.form = this.fb.group({
      language: ['', Validators.required],
      inputFile: ['', Validators.required]
    });
  }

  onFileSelect($event):void {
    this.readFile($event.target);
  }

  readFile(inputFile: any): void {
    var file: File = inputFile.files[0];
    var myReader: FileReader = new FileReader();
    var textResult: string | ArrayBuffer;
    myReader.onloadend = () => {
        
      textResult = myReader.result;
      this.fileString = textResult;
    }
    myReader.readAsText(file);
    // this.fileString = textResult;
    // console.log(this.fileString);
  }

  checkForPlagiarism() {
    let formValues = this.form.value;
    let checkData:ICheckData = {
      text: this.fileString,
      language: formValues.language
    } 
    console.log(formValues.language);
    console.log(this.fileString);
    // this.provider.checkCode(checkData).then(res => {
    //   console.log(res);
    // })
  }

}
