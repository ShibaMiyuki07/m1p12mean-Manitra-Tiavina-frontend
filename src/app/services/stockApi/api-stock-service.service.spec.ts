import { TestBed } from '@angular/core/testing';

import { ApiStockServiceService } from './api-stock-service.service';

describe('ApiStockServiceService', () => {
  let service: ApiStockServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiStockServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
