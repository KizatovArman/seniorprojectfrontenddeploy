import { Injectable } from '@angular/core';
import { IGoogleCloud } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MachinelearningService {

  private codeLines = 0;
  private codeLength = 0;
  private codeLoops = 0;
  private codeVariables = 0;
  private ifStatements = 0;
  private codeNoise = 0;
  constructor() { }

  prepareCodeForModel(code: string): IGoogleCloud {
    this.codeLines = code.split(/\r\n|\r|\n/).length;
    this.codeLength = code.length;
    this.codeLoops = (code.match(/for/g) || []).length + (code.match(/while/g) || []).length;
    this.codeVariables = (code.match(/int/g) || []).length + 
    (code.match(/double/g) || []).length + 
    (code.match(/char/g) || []).length + 
    (code.match(/string/g) || []).length +
    (code.match(/bool/g) || []).length +
    (code.match(/long/g) || []).length;
    this.ifStatements = (code.match(/if/g) || []).length + (code.match(/switch/g) || []).length;
    code.split(" ").forEach(s => {
      if(s.startsWith("//")){ 
        this.codeNoise++;
      }
    });
    var payload = {
      instances: [[this.codeLines, this.codeLength, this.codeLoops, this.codeVariables, this.ifStatements, this.codeNoise]]
    };
    this.codeLines = 0;
    this.codeLength = 0;
    this.codeLoops = 0;
    this.codeVariables = 0;
    this.ifStatements = 0;
    this.codeNoise = 0;
    return payload;
  }
}
