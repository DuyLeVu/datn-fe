import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserPostComponent } from './overview-user-post.component';

describe('OverviewUserPostComponent', () => {
  let component: OverviewUserPostComponent;
  let fixture: ComponentFixture<OverviewUserPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewUserPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewUserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
