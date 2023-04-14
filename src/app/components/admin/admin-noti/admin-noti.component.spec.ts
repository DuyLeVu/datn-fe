import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotiComponent } from './admin-noti.component';

describe('AdminNotiComponent', () => {
  let component: AdminNotiComponent;
  let fixture: ComponentFixture<AdminNotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNotiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
