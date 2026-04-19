import { TestBed } from '@angular/core/testing';

import { Comunesservice } from './comunesservice';

describe('Comunesservice', () => {
  let service: Comunesservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comunesservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
