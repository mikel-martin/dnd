import {TestBed} from '@angular/core/testing';

import {ProyectionService} from './proyection.service';

describe('ProyectionService', () => {
  let service: ProyectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
