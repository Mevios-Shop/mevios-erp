import { TestBed } from '@angular/core/testing';

import { ItemCompraService } from './item-compra.service';

describe('ItensCompraService', () => {
  let service: ItemCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
