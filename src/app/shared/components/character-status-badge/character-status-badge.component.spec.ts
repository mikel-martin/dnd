import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStatusBadgeComponent } from './character-status-badge.component';

describe('CharacterStatusBadgeComponent', () => {
  let component: CharacterStatusBadgeComponent;
  let fixture: ComponentFixture<CharacterStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterStatusBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
