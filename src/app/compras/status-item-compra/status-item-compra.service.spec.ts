import { TestBed } from '@angular/core/testing';

import { StatusItemCompraService } from './status-item-compra.service';

describe('StatusItemCompraService', () => {
  let service: StatusItemCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusItemCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
