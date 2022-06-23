import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarStatusItemCompraComponent } from './listar-status-item-compra.component';

describe('ListarStatusItemCompraComponent', () => {
  let component: ListarStatusItemCompraComponent;
  let fixture: ComponentFixture<ListarStatusItemCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarStatusItemCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarStatusItemCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
