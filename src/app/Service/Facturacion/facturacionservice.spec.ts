import { TestBed } from '@angular/core/testing';
import { Facturacionservice } from './facturacionservice';

describe('Facturacionservice', () => {
  let service: Facturacionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Facturacionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
