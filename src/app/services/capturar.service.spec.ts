import { TestBed } from '@angular/core/testing';

import { CapturarService } from './capturar.service';

describe('CapturarService', () => {
  let service: CapturarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
