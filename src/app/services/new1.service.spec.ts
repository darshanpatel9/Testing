import { TestBed, inject } from '@angular/core/testing';

import { New1Service } from './new1.service';

describe('New1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [New1Service]
    });
  });

  it('should be created', inject([New1Service], (service: New1Service) => {
    expect(service).toBeTruthy();
  }));
});
