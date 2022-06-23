import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarItensCompraComponent } from './listar-itens-compra.component';

describe('ListarItensCompraComponent', () => {
  let component: ListarItensCompraComponent;
  let fixture: ComponentFixture<ListarItensCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarItensCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarItensCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
