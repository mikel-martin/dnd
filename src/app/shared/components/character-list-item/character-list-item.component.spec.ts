import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListItemComponent } from './character-list-item.component';

describe('CharacterSheetComponent', () => {
  let component: CharacterListItemComponent;
  let fixture: ComponentFixture<CharacterListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
