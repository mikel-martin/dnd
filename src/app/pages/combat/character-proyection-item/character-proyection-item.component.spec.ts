import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCombatProyectionItemComponent } from './character-proyection-item.component';

describe('CharacterCombatProyectionItemComponent', () => {
  let component: CharacterCombatProyectionItemComponent;
  let fixture: ComponentFixture<CharacterCombatProyectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCombatProyectionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCombatProyectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
