import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCombatItemComponent } from './character-combat-item.component';

describe('CharacterCombatListItemComponent', () => {
  let component: CharacterCombatItemComponent;
  let fixture: ComponentFixture<CharacterCombatItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCombatItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCombatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
