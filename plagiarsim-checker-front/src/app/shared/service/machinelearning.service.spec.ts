import { TestBed } from '@angular/core/testing';

import { MachinelearningService } from './machinelearning.service';

describe('MachinelearningService', () => {
  let service: MachinelearningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachinelearningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
