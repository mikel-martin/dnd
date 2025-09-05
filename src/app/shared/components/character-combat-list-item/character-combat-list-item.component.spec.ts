import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCombatListItemComponent } from './character-combat-list-item.component';

describe('CharacterCombatListItemComponent', () => {
  let component: CharacterCombatListItemComponent;
  let fixture: ComponentFixture<CharacterCombatListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCombatListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCombatListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
