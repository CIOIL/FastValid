import { TestBed } from '@angular/core/testing';

import { FastValidService } from './fast-valid.service';

describe('FastValidService', () => {
  let service: FastValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastValidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
