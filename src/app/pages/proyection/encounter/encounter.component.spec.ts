import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EcnounterComponent} from './encounter.component';

describe('CombatComponent', () => {
  let component: EcnounterComponent;
  let fixture: ComponentFixture<EcnounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcnounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EcnounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
