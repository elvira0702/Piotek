import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfInfoComponent } from './self-info.component';

describe('SelfInfoComponent', () => {
  let component: SelfInfoComponent;
  let fixture: ComponentFixture<SelfInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
