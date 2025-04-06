import { TestBed } from '@angular/core/testing';

import { SchedulesServiceService } from './schedules-service.service';

describe('SchedulesServiceService', () => {
  let service: SchedulesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
