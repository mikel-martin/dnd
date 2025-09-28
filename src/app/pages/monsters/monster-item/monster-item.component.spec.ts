import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonsterItemComponent} from './monster-item.component';

describe('MonsterItemComponent', () => {
  let component: MonsterItemComponent;
  let fixture: ComponentFixture<MonsterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
