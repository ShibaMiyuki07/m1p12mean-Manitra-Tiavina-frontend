import { TestBed } from '@angular/core/testing';

import { ApiProductServiceService } from './api-product-service.service';

describe('ApiProductServiceService', () => {
  let service: ApiProductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProductServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
