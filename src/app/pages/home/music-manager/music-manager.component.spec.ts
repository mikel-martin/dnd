import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicManagerComponent } from './music-manager.component';

describe('MusicManagerComponent', () => {
  let component: MusicManagerComponent;
  let fixture: ComponentFixture<MusicManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
