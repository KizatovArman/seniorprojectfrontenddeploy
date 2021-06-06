import { TestBed } from '@angular/core/testing';

import { CheckerGuardService } from './checker-guard.service';

describe('CheckerGuardService', () => {
  let service: CheckerGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
