import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellItemComponent } from './spell-item.component';

describe('SpellItemComponent', () => {
  let component: SpellItemComponent;
  let fixture: ComponentFixture<SpellItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
