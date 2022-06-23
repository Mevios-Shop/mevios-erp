import { TestBed } from '@angular/core/testing';

import { StatusCompraService } from './status-compra.service';

describe('StatusCompraService', () => {
  let service: StatusCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
