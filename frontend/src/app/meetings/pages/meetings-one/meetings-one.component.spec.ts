import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsOneComponent } from './meetings-one.component';

describe('MeetingsOneComponent', () => {
  let component: MeetingsOneComponent;
  let fixture: ComponentFixture<MeetingsOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
