import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarStatusVendaComponent } from './listar-status-venda.component';

describe('ListarStatusVendaComponent', () => {
  let component: ListarStatusVendaComponent;
  let fixture: ComponentFixture<ListarStatusVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarStatusVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarStatusVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
