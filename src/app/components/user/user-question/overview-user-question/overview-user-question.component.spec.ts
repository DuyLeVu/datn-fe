import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserQuestionComponent } from './overview-user-question.component';

describe('OverviewUserQuestionComponent', () => {
  let component: OverviewUserQuestionComponent;
  let fixture: ComponentFixture<OverviewUserQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewUserQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewUserQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
