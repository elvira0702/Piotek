import { TestBed, inject } from '@angular/core/testing';

import { FormServiceService } from './form.service';

describe('FormServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormServiceService]
    });
  });

  it('should be created', inject([FormServiceService], (service: FormServiceService) => {
    expect(service).toBeTruthy();
  }));
});
