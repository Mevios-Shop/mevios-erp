import { TestBed } from '@angular/core/testing';

import { StatusVendaService } from './status-venda.service';

describe('StatusVendaService', () => {
  let service: StatusVendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusVendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
