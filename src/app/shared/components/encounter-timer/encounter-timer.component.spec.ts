import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EncounterTimerComponent} from './encounter-timer.component';

describe('EncounterTimerComponent', () => {
  let component: EncounterTimerComponent;
  let fixture: ComponentFixture<EncounterTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncounterTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EncounterTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
