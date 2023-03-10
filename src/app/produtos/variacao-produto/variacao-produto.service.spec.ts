import { TestBed } from '@angular/core/testing';

import { VariacaoProdutoService } from './variacao-produto.service';

describe('VariacaoProdutoService', () => {
  let service: VariacaoProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariacaoProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
