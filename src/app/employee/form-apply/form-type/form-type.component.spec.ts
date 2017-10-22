import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypeComponent } from './form-type.component';

describe('FormTypeComponent', () => {
  let component: FormTypeComponent;
  let fixture: ComponentFixture<FormTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
