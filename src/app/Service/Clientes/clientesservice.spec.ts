import { TestBed } from '@angular/core/testing';

import { Clientesservice } from './clientesservice';

describe('Clientesservice', () => {
  let service: Clientesservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clientesservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
