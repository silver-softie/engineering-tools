import { TestBed } from '@angular/core/testing';

import { HaversineService } from './haversine.service';

describe('HaversineService', () => {
  let service: HaversineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaversineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
