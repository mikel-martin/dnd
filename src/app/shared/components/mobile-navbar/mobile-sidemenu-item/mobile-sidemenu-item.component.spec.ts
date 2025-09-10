import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MobileSidemenuItemComponent} from './mobile-sidemenu-item.component';

describe('SidemenuItemComponent', () => {
  let component: MobileSidemenuItemComponent;
  let fixture: ComponentFixture<MobileSidemenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSidemenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSidemenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
