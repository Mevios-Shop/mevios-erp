import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVariacoesProdutoComponent } from './listar-variacoes-produto.component';

describe('ListarVariacoesProdutoComponent', () => {
  let component: ListarVariacoesProdutoComponent;
  let fixture: ComponentFixture<ListarVariacoesProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVariacoesProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVariacoesProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
