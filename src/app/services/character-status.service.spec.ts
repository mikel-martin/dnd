import {TestBed} from '@angular/core/testing';

import {CharacterStatusService} from './character-status.service';

describe('CharacterStatusService', () => {
  let service: CharacterStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
