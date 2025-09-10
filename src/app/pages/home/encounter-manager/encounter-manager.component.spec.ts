import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EncounterManagerComponent} from './encounter-manager.component';

describe('EncounterManagerComponent', () => {
  let component: EncounterManagerComponent;
  let fixture: ComponentFixture<EncounterManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncounterManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EncounterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
