import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApplyComponent } from './form-apply.component';

describe('FormApplyComponent', () => {
  let component: FormApplyComponent;
  let fixture: ComponentFixture<FormApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
