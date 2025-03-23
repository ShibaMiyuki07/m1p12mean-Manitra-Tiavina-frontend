import { TestBed } from '@angular/core/testing';

import { ApiReservationServiceService } from './api-reservation-service.service';

describe('ApiReservationServiceService', () => {
  let service: ApiReservationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiReservationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
