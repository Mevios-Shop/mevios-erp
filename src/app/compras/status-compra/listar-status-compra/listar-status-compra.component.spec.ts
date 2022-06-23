import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarStatusCompraComponent } from './listar-status-compra.component';

describe('ListarStatusCompraComponent', () => {
  let component: ListarStatusCompraComponent;
  let fixture: ComponentFixture<ListarStatusCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarStatusCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarStatusCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
