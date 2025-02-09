import { TestBed } from '@angular/core/testing';

import { DomiciliogeograficoService } from './domiciliogeografico.service';

describe('DomiciliogeograficoService', () => {
  let service: DomiciliogeograficoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomiciliogeograficoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
