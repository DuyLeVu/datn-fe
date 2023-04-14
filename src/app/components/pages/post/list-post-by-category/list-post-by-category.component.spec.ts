import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostByCategoryComponent } from './list-post-by-category.component';

describe('ListPostByCategoryComponent', () => {
  let component: ListPostByCategoryComponent;
  let fixture: ComponentFixture<ListPostByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPostByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
