import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesVariacaoProdutoComponent } from './detalhes-variacao-produto.component';

describe('DetalhesVariacaoProdutoComponent', () => {
  let component: DetalhesVariacaoProdutoComponent;
  let fixture: ComponentFixture<DetalhesVariacaoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesVariacaoProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesVariacaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
