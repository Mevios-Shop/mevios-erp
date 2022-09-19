import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacaoVendasComponent } from './importacao-vendas.component';

describe('ImportacaoVendasComponent', () => {
  let component: ImportacaoVendasComponent;
  let fixture: ComponentFixture<ImportacaoVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportacaoVendasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportacaoVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
