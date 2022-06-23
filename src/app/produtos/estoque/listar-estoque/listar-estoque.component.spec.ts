import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstoqueComponent } from './listar-estoque.component';

describe('ListarEstoqueComponent', () => {
  let component: ListarEstoqueComponent;
  let fixture: ComponentFixture<ListarEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEstoqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
