import { TestBed } from '@angular/core/testing';

import { DepotCompteService } from './depot-compte.service';

describe('DepotCompteService', () => {
  let service: DepotCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepotCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
